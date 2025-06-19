import React from 'react';
import SpamMailButton from '../SpamMailButton/SpamMailButton';
import DeleteMailButton from '../DeleteMailButton/DeleteMailButton';
import CancelMailButton from '../CancelMailButton/CancelMailButton';
import './SelectedMailsAction.css';

export default function SelectedMailsAction({ inSpamFolder, onSpamToggle, onDelete, onCancel }) {
  return (
    <div className="buttons-container">
      <SpamMailButton onClick={onSpamToggle} />
      <DeleteMailButton onClick={onDelete} />
      <CancelMailButton onClick={onCancel} />
    </div>
  );
}