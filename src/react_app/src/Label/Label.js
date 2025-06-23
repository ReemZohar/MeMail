import './Label.css';
import { MdLabel, MdMoreVert } from 'react-icons/md';

function Label({ icon, name, isActive, onClick, theme, showMenuButton = false }) {
  return (
    <div
      className={`label ${isActive ? 'active' : ''} ${theme === 'dark' ? 'dark' : 'light'}`}
      onClick={onClick}
    >
      <div className="label-content">
        <span className="label-icon">{icon}</span>
        <span className="label-text">{name}</span>
      </div>

      {showMenuButton && (
        <button
          className="label-menu-button"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MdMoreVert size={20} />
        </button>
      )}
    </div>
  );
}

// Custom user's label component
Label.CustomLabel = ({ name, isActive, onClick, theme, onMenuClick, isCollapsed }) => {
  return (
    <div
      className={`label ${isActive ? 'active' : ''} ${theme === 'dark' ? 'dark' : 'light'}`}
      onClick={() => {
        onClick?.();
      }}
    >
      <div className="label-content">
        <span className="label-icon"><MdLabel size={18} /></span>
        {!isCollapsed && <span className="label-text">{name}</span>}
      </div>

      {!isCollapsed && (
        <button
          className="label-menu-button"
          onClick={(e) => {
            e.stopPropagation();
            onMenuClick?.(e);
          }}
        >
          <MdMoreVert size={20} />
        </button>
      )}
    </div>
  );
};

export default Label;