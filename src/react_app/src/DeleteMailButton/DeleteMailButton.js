import React from 'react';
import { MdDelete } from 'react-icons/md';
import './DeleteMailButton.css';

const DeleteMailButton = ({ onClick }) => {
  return (
    <button className="deleteMail-button" onClick={onClick}>
      <MdDelete size={24} />
    </button>
  );
};


export default DeleteMailButton;
