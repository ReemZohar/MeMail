import SearchBar from '../SearchBar/SearchBar';
import './TopPanel.css';

function TopPanel({ onUserClick, userBtnRef, avatar, token, onSearchResults }) {
  return (
    <div className="top-panel">
      <div className="top-panel-left">
        <SearchBar token={token} onSearchResults={onSearchResults} />
      </div>
      <div className="top-panel-right">
        <button
          ref={userBtnRef}
          className="user-button"
          onClick={onUserClick}
          aria-label="User menu"
        >
          <img src={avatar} alt="Avatar" className="avatar-icon" />
        </button>
      </div>
    </div>
  );
}

export default TopPanel;