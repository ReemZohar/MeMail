import React, { useEffect, useState } from 'react';
import './UserWindow.css';
import LogOutButton from '../LogOutButton/LogOutButton';

const UserWindow = ({ userId, token, onClose, avatar, name, username }) => {
  return (
    <div className="user-window">
      <button 
        className="user-window-close-btn" 
        onClick={onClose} 
        aria-label="Close user window"
      >
        ×
      </button>
      <div className="user-email-top">{username}</div>
      <img src={avatar} alt="Avatar" className="user-avatar" />
      <div className="user-greeting">Hi, {name}!</div>
      <div className="logout-wrapper">
        <LogOutButton />
      </div>
    </div>
  );
};

export default UserWindow;