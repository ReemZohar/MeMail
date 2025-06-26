import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdExitToApp } from 'react-icons/md';

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
  className="btn btn-light flex-grow-1 button-left-margin-white"
  type="button"
>
  <MdExitToApp size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
  Logout
</button>

  );
}

export default LogOutButton;