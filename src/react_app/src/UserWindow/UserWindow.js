import React, { useEffect, useState } from 'react';
import './UserWindow.css';
import LogOutButton from '../LogOutButton/LogOutButton';

const UserWindow = ({ userId, token, onClose }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!userId || !token) return;

    fetch(`http://localhost:9090/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch user data');
        return res.json();
      })
      .then(data => setUserData(data))
      .catch(err => console.error(err));
  }, [userId, token]);

  if (!userData) return null;

  return (
    <div className="user-window">
      <button 
        className="user-window-close-btn" 
        onClick={onClose} 
        aria-label="Close user window"
      >
        ×
      </button>
      <div className="user-email-top">{userData.username}!</div>
      <img src={userData.avatar} alt="Avatar" className="user-avatar" />
      <div className="user-greeting">Hi, {userData.name}!</div>
      <div className="logout-wrapper">
        <LogOutButton />
      </div>
    </div>
  );
};

export default UserWindow;