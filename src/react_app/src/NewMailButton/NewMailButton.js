import React from 'react';
import { MdCreate } from 'react-icons/md';
import './NewMailButton.css';

function NewMailButton({ theme, onClick, isCollapsed }) {
  return (
    <button
      className={`newMail-button ${theme === 'dark' ? 'dark' : 'light'} ${isCollapsed ? 'collapsed' : ''}`}
      onClick={onClick}
    >
      <MdCreate size={20} className="newMail-icon" />
      {!isCollapsed && <span className="text">Compose</span>}
    </button>
  );
}

export default NewMailButton;
