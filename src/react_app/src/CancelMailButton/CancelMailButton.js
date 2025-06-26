import React from 'react';
import './CancelMailButton.css';

export default function CancelMailButton({ onClick }) {
  return (
    <div className="tooltip-container">
      <button className="cancelButton" onClick={onClick}>
        <i className="bi bi-x-lg"></i>
      </button>
      <span className="tooltip-text">Cancel</span>
    </div>
  );
}