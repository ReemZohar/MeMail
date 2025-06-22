import React from 'react';
import './MinimizedMail.css';

function MinimizedMail({ title, onClick, onClose }) {
  return (
    <div className="minimized-mail shadow-sm" onClick={onClick}>
      <span>{title || 'Draft'}</span>
      <button className="close-btn" onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}>
        ✖
      </button>
    </div>
  );
}

export default MinimizedMail;
