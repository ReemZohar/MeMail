import React, { useState } from 'react';
import './CustomLabelMenu.css';
import Label from '../Label/Label';
import NewCustomLabelWindow from './NewCustomLabelWindow';

function CustomLabelMenu({ theme, clickOnLabel, activeLabelId }) {
  const [labels, setLabels] = useState([]);
  const [isWindowOpen, setIsWindowOpen] = useState(false);  //Open window state

  //Adding a new label by name
  const addLabel = (labelName) => {
    const newLabel = {
      id: `label${labels.length + 1}`,
      name: labelName,
    };
    setLabels(prevLabels => [...prevLabels, newLabel]);
    setIsWindowOpen(false);  // סוגר את החלון אחרי שמירה
  };

  return (
    <div className="customLabelMenu">
      <div className="labels-header">
        <span className="labels-title">Labels</span>
        <button
          className="addLabel-button"
          onClick={() => setIsWindowOpen(true)}
        >
          +
        </button>
      </div>

      {labels.map(label => (
        <Label.CustomLabel
          key={label.id}
          theme={theme}
          name={label.name}
          isActive={label.id === activeLabelId}
          onClick={() => clickOnLabel(label.id)}
        />
      ))}

      {isWindowOpen && (
        <NewCustomLabelWindow
          onSave={addLabel}
          onCancel={() => setIsWindowOpen(false)}
        />
      )}
    </div>
  );
}

export default CustomLabelMenu;
