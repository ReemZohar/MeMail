import React, { useState } from 'react';
import './NewCustomLabelWindow.css';

function NewCustomLabelWindow({ onSave, onCancel }) {
  const [labelName, setLabelName] = useState('');

  const handleSave = () => {
    if (labelName.trim()) {
      onSave(labelName.trim());
      setLabelName('');
    }
  };

  return (
    <div className="window-overlay">
      <div className="window-content">
        <h4>New label</h4>
        <h5 style={{ fontSize: '14px' }}>Please enter a new label name:</h5>
        <input
          type="text"
          value={labelName}
          onChange={(e) => setLabelName(e.target.value)}
          placeholder="Label name"
        />
        <div className="window-buttons">
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default NewCustomLabelWindow;
