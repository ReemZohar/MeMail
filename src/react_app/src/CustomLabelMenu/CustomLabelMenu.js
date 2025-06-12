import React, { useState } from 'react';
import './CustomLabelMenu.css';
import Label from '../Label/Label';

function CustomLabelMenu({ theme, clickOnLabel, activeLabelId }) {
  //An empty array
  const [labels, setLabels] = useState([]);

  //Adding a new label
  const addLabel = (newLabel) => {
    setLabels(prevLabels => [...prevLabels, newLabel]);
  };

  return (
    <div className="customLabelMenu">
      <div className="labels-header">
        <span className="labels-title">Labels</span>
        <button
          className="addLabel-button"
          onClick={() => addLabel({ id: `label${labels.length + 1}`, name: `Label ${labels.length + 1}` })}
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
    </div>
  );
}

export default CustomLabelMenu;