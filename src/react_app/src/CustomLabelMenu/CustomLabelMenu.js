import React, { useState } from 'react';
import './CustomLabelMenu.css';
import Label from '../Label/Label';
import NewCustomLabelWindow from './NewCustomLabelWindow';
import LabelOptionsMenu from './LabelOptionsMenu';

function CustomLabelMenu({ theme, labels, onLabelClick, activeLabelId, isCollapsed, token, setLabels }) {
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [openOptionsId, setOpenOptionsId] = useState(null);
  const [editLabelData, setEditLabelData] = useState(null);

  const addLabel = (labelName) => {
    if (!labelName.trim()) return;
    fetch(`http://localhost:9090/api/labels`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: labelName.trim(), color: 'blue' }),
    })
      .then(res => res.json())
      .then(newLabel => {
        setLabels(prev => [...prev, newLabel]);
        setIsWindowOpen(false);
      })
      .catch(err => console.error('Failed to add label', err));
  };

  const saveEditedLabel = (newName) => {
    if (!editLabelData || !newName.trim()) return;
    fetch(`http://localhost:9090/api/labels/${editLabelData.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newName.trim() }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update label');
        setLabels(prev =>
          prev.map(label => (label.id === editLabelData.id ? { ...label, name: newName.trim() } : label))
        );
        setEditLabelData(null);
      })
      .catch(err => console.error(err));
  };

  const deleteLabel = (id) => {
    fetch(`http://localhost:9090/api/labels/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.ok) {
          setLabels(prev => prev.filter(label => label.id !== id));
        } else {
          throw new Error('Failed to delete label');
        }
      })
      .catch(err => console.error(err));
    setOpenOptionsId(null);
  };

  const openEditLabel = (label) => {
    setEditLabelData(label);
    setOpenOptionsId(null);
  };

return (
  <div className={`customLabelMenu ${theme}`}>
    <div className="labels-header">
      {!isCollapsed && <span className="labels-title">Labels</span>}
      <button
        className="addCustomLabel-button"
        onClick={() => setIsWindowOpen(true)}
        title="Add label"
        aria-label="Add label"
      >
        +
      </button>
    </div>

  <div className="labelMenu">
    {labels.map(label => (
      <div
        key={label.id}
        className="label-wrapper"
      >
        <Label.CustomLabel
          theme={theme}
          name={label.name}
          isActive={label.id === activeLabelId}
          onClick={() => onLabelClick(label.id, false, null, true)}
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
            className="label-options-menu"
          />
        )}
      </div>
    ))}
  </div>

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