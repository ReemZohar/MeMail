import './Label.css';
import { MdInbox } from 'react-icons/md';

function Label({ icon, name, isActive, onClick, theme }) {
  return (
    <button
      className={`label ${isActive ? 'active' : ''} ${theme === 'dark' ? 'dark' : 'light'}`}
      onClick={onClick}
    >
      <span className="label-icon">{icon}</span>
      <span className="label-text">{name}</span>
    </button>
  );
}

export default Label;