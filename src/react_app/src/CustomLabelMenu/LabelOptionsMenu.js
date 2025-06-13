import React from 'react';
import './LabelOptionsMenu.css';

function LabelOptionsMenu({ onEdit, onDelete, onClose }) {
  return (
    <div className="label-options-menu">
      <button className="option-btn" onClick={onEdit}>Edit</button>
      <button className="option-btn delete" onClick={onDelete}>Remove label</button>
      <button className="option-btn close" onClick={onClose}>✖</button>
    </div>
  );
}

export default LabelOptionsMenu;
