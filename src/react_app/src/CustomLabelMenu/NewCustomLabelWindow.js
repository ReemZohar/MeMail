import React, { useState, useEffect } from 'react';
import './NewCustomLabelWindow.css';

function NewCustomLabelWindow({ title="New label", content="Please enter a new label name:", onSave, onCancel, initialValue = '' }) {
  const [labelName, setLabelName] = useState(initialValue);

  useEffect(() => {
    setLabelName(initialValue);
  }, [initialValue]);

  const handleSave = () => {
    if (labelName.trim()) {
      onSave(labelName.trim());
      setLabelName('');
    }
  };

  return (
    <div className="window-overlay">
      <div className="window-content">
        <h4>{title}</h4>
        <h5 style={{ fontSize: '14px' }}>{content}</h5>
        <input
          type="text"
          value={labelName}
          onChange={(e) => setLabelName(e.target.value)}
          placeholder="Label name"
        />
        <div className="window-buttons">
          <button className="btn btn-light flex-grow-1 button-left-margin-white" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn btn-primary flex-grow-1 button-left-margin-blue"
            onClick={handleSave}
            disabled={!labelName.trim()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewCustomLabelWindow;
