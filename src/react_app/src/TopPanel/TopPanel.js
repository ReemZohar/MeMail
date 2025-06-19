import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { MdAccountCircle } from 'react-icons/md';
import './TopPanel.css';

function TopPanel() {
  const handleUserClick = () => {
    alert('Open user panel'); //Todo open UserWindow when it's ready
  };

  return (
    <div className="top-panel">
      <div className="top-panel-left">
        <SearchBar />
      </div>
      <div className="top-panel-right">
        <button className="user-button" onClick={handleUserClick} aria-label="User menu">
          <MdAccountCircle size={32} />
        </button>
      </div>
    </div>
  );
}

export default TopPanel;