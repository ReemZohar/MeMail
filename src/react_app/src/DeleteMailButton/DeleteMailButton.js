import React from 'react';
import { MdDelete } from 'react-icons/md';
import './DeleteMailButton.css';

const DeleteMailButton = ({ onClick }) => {
  return (
    <div className="tooltip-container">
      <button className="deleteMail-button" onClick={onClick}>
        <MdDelete size={18} />
      </button>
      <span className="tooltip-text">Delete</span>
    </div>
  );
};

export default DeleteMailButton;
