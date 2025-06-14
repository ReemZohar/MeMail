import React from 'react';
import { MdReport } from 'react-icons/md';
import './SpamMailButton.css';

const SpamMailButton = ({ onClick }) => {
  return (
    <button className="spamMail-button" onClick={onClick} aria-label="Mark as spam">
      <MdReport size={20} />
    </button>
  );
};


export default SpamMailButton;