import React from 'react';
import { MdDelete } from 'react-icons/md';
import './DeleteMailButton.css';

const DeleteMailButton = ({ mailId, onDeleted }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/mails/${mailId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, //JWT
        },
      });

      if (response.status === 204) {
        if (onDeleted) onDeleted(mailId); //Update mail list
      } else {
        console.error('Failed to delete mail');
      }
    } catch (error) {
      console.error('Error deleting mail:', error);
    }
  };

  return (
    <button
      className="deleteMail-button"
      onClick={handleDelete}
      title="Delete"
    >
      <MdDelete size={24} color="#444" />
    </button>
  );
};

export default DeleteMailButton;
