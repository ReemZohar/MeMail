import React, { useState } from 'react';
import './CustomLabelMenu.css';
import Label from '../Label/Label';
import NewCustomLabelWindow from './NewCustomLabelWindow';
import LabelOptionsMenu from './LabelOptionsMenu';

function CustomLabelMenu({ theme, clickOnLabel, activeLabelId, isCollapsed }) {
  const [labels, setLabels] = useState([]);
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [openOptionsId, setOpenOptionsId] = useState(null);
  const [editLabelData, setEditLabelData] = useState(null);

  const addLabel = (labelName) => {
    const newLabel = {
      id: `label${Date.now()}`,
      name: labelName,
    };
    setLabels(prevLabels => [...prevLabels, newLabel]);
    setIsWindowOpen(false);
  };

  const saveEditedLabel = (newName) => {
    if (editLabelData) {
      setLabels(prev =>
        prev.map(label =>
          label.id === editLabelData.id ? { ...label, name: newName } : label
        )
      );
      setEditLabelData(null);
    }
  };

  const deleteLabel = (id) => {
    setLabels(prev => prev.filter(label => label.id !== id));
    setOpenOptionsId(null);
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
