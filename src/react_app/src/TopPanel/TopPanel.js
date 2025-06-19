import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { MdAccountCircle } from 'react-icons/md';
import './TopPanel.css';

function TopPanel({ onUserClick, userBtnRef }) {
  return (
    <div className="top-panel">
      <div className="top-panel-left">
        <SearchBar />
      </div>
      <div className="top-panel-right">
        <button
          ref={userBtnRef}
          className="user-button"
          onClick={onUserClick}
          aria-label="User menu"
        >
          <MdAccountCircle size={32} />
        </button>
      </div>
    </div>
  );
}

export default TopPanel;