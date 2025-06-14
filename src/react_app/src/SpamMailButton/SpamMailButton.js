import React from 'react';
import { MdReport } from 'react-icons/md';
import './SpamMailButton.css';

const SpamMailButton = ({ onClick }) => {
  return (
    <div className="tooltip-container">
      <button
        className="spamMail-button"
        onClick={onClick}
        aria-label="Mark as spam"
      >
        <MdReport size={20} />
      </button>
      <span className="tooltip-text">Report spam</span>
    </div>
  );
};

export default SpamMailButton;
