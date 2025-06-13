import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdExitToApp } from 'react-icons/md';

function LogOutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await fetch('http://localhost:9090/api/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error('Logout failed on server');
        }
      }
    } catch (error) {
      console.error('Logout request error:', error);
    }

    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-light flex-grow-1 logout-button"
      type="button"
    >
      <MdExitToApp size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
      Logout
    </button>
  );
}

export default LogOutButton;