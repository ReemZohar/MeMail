import React from 'react';
import { MdReport } from 'react-icons/md';
import './SpamMailButton.css';

const SpamMailButton = () => {


  return (
    <button className="spamMail-button" aria-label="Mark as spam">
      <MdReport size={20} />
    </button>
  );
};

export default SpamMailButton;