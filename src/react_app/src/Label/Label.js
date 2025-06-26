import './Label.css';

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
          <i className="bi bi-three-dots-vertical icon-dots"></i>
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
        <span className="label-icon">
          <i className="bi bi-tag icon-tag"></i>
        </span>
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
          <i className="bi bi-three-dots-vertical icon-dots"></i>
        </button>
      )}
    </div>
  );
};

export default Label;