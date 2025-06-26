import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogOutButton.css';

function LogOutButton({ token }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await fetch('http://localhost:9090/api/tokens/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error('Logout failed on server');
          alert('Logout failed. Please try again.');
          return;
        }
      }
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout request error:', error);
      alert('Network error. Logout failed.');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="logout-button"
      type="button"
    >
      <i className="bi bi-box-arrow-right" style={{ marginRight: '8px', verticalAlign: 'middle', fontSize: 20 }}></i>
      Logout
    </button>
  );
}

export default LogOutButton;