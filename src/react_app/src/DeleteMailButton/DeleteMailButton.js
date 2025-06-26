import React from 'react';
import './DeleteMailButton.css';

const DeleteMailButton = ({ onClick }) => {
  return (
    <div className="tooltip-container">
      <button className="deleteMail-button" onClick={onClick}>
        <i className="bi bi-trash"></i>
      </button>
      <span className="tooltip-text">Delete</span>
    </div>
  );
};

export default DeleteMailButton;