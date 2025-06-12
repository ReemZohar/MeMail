import './Label.css';
import { MdInbox, MdStar, MdSend, MdReport, MdLabel } from 'react-icons/md';

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

//Custom user's label component
Label.CustomLabel = ({ name, isActive, onClick, theme }) => {
  return (
    <Label
      icon={<MdLabel size={18} />}
      name={name}
      isActive={isActive}
      onClick={onClick}
      theme={theme}
    />
  );
};

export default Label;