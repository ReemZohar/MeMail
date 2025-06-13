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

//Custom user's label component
Label.CustomLabel = ({ name, isActive, onClick, theme }) => {
  return (
    <Label
      icon={<MdLabel size={18} />}
      name={name}
      isActive={isActive}
      onClick={onClick}
      theme={theme}
      showMenuButton={true}
    />
  );
};

export default Label;