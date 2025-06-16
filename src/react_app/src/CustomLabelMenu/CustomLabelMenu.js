import React, { useState, useEffect } from 'react';
import './CustomLabelMenu.css';
import Label from '../Label/Label';
import NewCustomLabelWindow from './NewCustomLabelWindow';
import LabelOptionsMenu from './LabelOptionsMenu';
import { MdWarning } from 'react-icons/md';

function CustomLabelMenu({ theme, clickOnLabel, activeLabelId, isCollapsed }) {
  const [labels, setLabels] = useState([]);
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [openOptionsId, setOpenOptionsId] = useState(null);
  const [editLabelData, setEditLabelData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const token = localStorage.getItem('token');

  // Load labels from server on mount
  useEffect(() => {
    fetch('http://localhost:9090/api/labels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(setLabels)
      .catch(err => console.error('Failed to fetch labels:', err));
  }, []);

  // Add new label
  const addLabel = async (labelName) => {
    setErrorMessage('');
    try {
      const res = await fetch('http://localhost:9090/api/labels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: labelName }),
      });

      if (!res.ok) {
        const err = await res.json();
        setErrorMessage(err.error || 'Unknown error');
        console.error('Failed to add label:', err.error);
        return;
      }

      const newLabel = await res.json();
      setLabels(prevLabels => [...prevLabels, newLabel]);
      setIsWindowOpen(false);
    } catch (err) {
      console.error('Network error while adding label:', err);
      setErrorMessage('Network error occurred');
    }
  };

  // Save changes to existing label
  const saveEditedLabel = async (newName) => {
    if (!editLabelData) return;

    setErrorMessage('');
    try {
      const res = await fetch(`http://localhost:9090/api/labels/${editLabelData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newName }),
      });

      if (!res.ok) {
        const err = await res.json();
        setErrorMessage(err.error || 'Unknown error');
        console.error('Failed to update label:', err.error);
        return;
      }

      // Update label in local state
      setLabels(prev =>
        prev.map(label =>
          label.id === editLabelData.id ? { ...label, name: newName } : label
        )
      );
      setEditLabelData(null);
    } catch (err) {
      console.error('Network error while updating label:', err);
      setErrorMessage('Network error occurred');
    }
  };

  // Delete a label from the server and update state
  const deleteLabel = async (id) => {
    try {
      const res = await fetch(`http://localhost:9090/api/labels/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const err = await res.json();
        setErrorMessage(err.error || 'Unknown error');
        console.error('Failed to delete label:', err.error);
        return;
      }

      setLabels(prev => prev.filter(label => label.id !== id));
      setOpenOptionsId(null);
    } catch (err) {
      console.error('Network error while deleting label:', err);
      setErrorMessage('Network error occurred');
    }
  };

  const openEditLabel = (label) => {
    setEditLabelData(label);
    setOpenOptionsId(null);
    setErrorMessage('');
  };

  return (
    <div className="customLabelMenu">
      <div className="labels-header">
        {!isCollapsed && <span className="labels-title">Labels</span>}
        <button
          className="addCustomLabel-button"
          onClick={() => {
            setIsWindowOpen(true);
            setErrorMessage('');
          }}
        >
          +
        </button>
      </div>

      {/* Render all labels */}
      {labels.map(label => (
        <div key={label.id} className="label-item" style={{ position: 'relative' }}>
          <Label.CustomLabel
            theme={theme}
            name={label.name}
            isActive={label.id === activeLabelId}
            onClick={() => clickOnLabel(label.id)}
            onMenuClick={() =>
              setOpenOptionsId(prev => prev === label.id ? null : label.id)
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

      {/* Error message (if any) */}
      {errorMessage && (
        <div className="error-message" role="alert" style={{ display: 'flex', alignItems: 'center' }}>
          <MdWarning size={18} color="#d93025" style={{ marginRight: 8 }} />
          {errorMessage}
        </div>
      )}

      {/* Create new label window */}
      {isWindowOpen && (
        <NewCustomLabelWindow
          onSave={addLabel}
          onCancel={() => {
            setIsWindowOpen(false);
            setErrorMessage('');
          }}
        />
      )}

      {/* Edit label window */}
      {editLabelData && (
        <NewCustomLabelWindow
          title="Edit label"
          content="Label name:"
          initialValue={editLabelData.name}
          onSave={saveEditedLabel}
          onCancel={() => {
            setEditLabelData(null);
            setErrorMessage('');
          }}
        />
      )}
    </div>
  );
}

export default CustomLabelMenu;
