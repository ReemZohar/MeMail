import React from 'react';
import { MdClose } from 'react-icons/md';
import './CancelMailButton.css';

export default function CancelMailButton({ onClick }) {
  return (
    <div className="tooltip-container">
      <button className="cancelButton" onClick={onClick}>
        <MdClose size={20} />
      </button>
      <span className="tooltip-text">Cancel</span>
    </div>
  );
}