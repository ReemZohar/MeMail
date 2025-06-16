import React, { useState, useEffect } from 'react';
import './CustomLabelMenu.css';
import Label from '../Label/Label';
import NewCustomLabelWindow from './NewCustomLabelWindow';
import LabelOptionsMenu from './LabelOptionsMenu';

function CustomLabelMenu({ theme, clickOnLabel, activeLabelId, isCollapsed, token }) {
  const [labels, setLabels] = useState([]);
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [openOptionsId, setOpenOptionsId] = useState(null);
  const [editLabelData, setEditLabelData] = useState(null);

  const fetchLabels = async () => {
    try {
      const res = await fetch('http://localhost:9090/api/labels', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Failed to fetch labels');
      const data = await res.json();
      setLabels(data);
    } catch (err) {
      console.error('Error fetching labels:', err);
    }
  };

  useEffect(() => {
    fetchLabels();
  }, []);

  const addLabel = async (labelName) => {
    try {
      const res = await fetch('http://localhost:9090/api/labels', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: labelName, color: 'gray' }) // או בחר צבע מתאים
      });
      if (!res.ok) throw new Error('Failed to create label');
      await fetchLabels();
      setIsWindowOpen(false);
    } catch (err) {
      console.error('Error creating label:', err);
    }
  };

  const saveEditedLabel = async (newName) => {
    if (editLabelData) {
      try {
        const res = await fetch(`http://localhost:9090/api/labels/${editLabelData.id}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newName })
        });
        if (!res.ok) throw new Error('Failed to update label');
        await fetchLabels();
        setEditLabelData(null);
      } catch (err) {
        console.error('Error editing label:', err);
      }
    }
  };

  const deleteLabel = async (id) => {
    try {
      const res = await fetch(`http://localhost:9090/api/labels/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Failed to delete label');
      await fetchLabels();
      setOpenOptionsId(null);
    } catch (err) {
      console.error('Error deleting label:', err);
    }
  };

  const openEditLabel = (label) => {
    setEditLabelData(label);
    setOpenOptionsId(null);
  };

  return (
    <div className="customLabelMenu">
      <div className="labels-header">
        {!isCollapsed && <span className="labels-title">Labels</span>}
        <button className="addCustomLabel-button" onClick={() => setIsWindowOpen(true)}>
          +
        </button>
      </div>

      {labels.map(label => (
        <div key={label.id} className="label-item" style={{ position: 'relative' }}>
          <Label.CustomLabel
            theme={theme}
            name={label.name}
            isActive={label.id === activeLabelId}
            onClick={() => clickOnLabel(label.id)}
            onMenuClick={() =>
              setOpenOptionsId(prev => (prev === label.id ? null : label.id))
            }
            isCollapsed={isCollapsed}
          />

          {!isCollapsed && openOptionsId === label.id && (
            <LabelOptionsMenu
              onEdit={() => openEditLabel(label)}
              onDelete={() => deleteLabel(label.id)}
              onClose={() => setOpenOptionsId(null)}
            />
          )}
        </div>
      ))}

      {isWindowOpen && (
        <NewCustomLabelWindow
          onSave={addLabel}
          onCancel={() => setIsWindowOpen(false)}
        />
      )}

      {editLabelData && (
        <NewCustomLabelWindow
          title="Edit label"
          content="Label name:"
          initialValue={editLabelData.name}
          onSave={saveEditedLabel}
          onCancel={() => setEditLabelData(null)}
        />
      )}
    </div>
  );
}

export default CustomLabelMenu;
