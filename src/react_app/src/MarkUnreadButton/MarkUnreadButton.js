import './MarkUnreadButton.css';
import { MdMarkEmailUnread } from 'react-icons/md';

const MarkUnreadButton = ({ onClick }) => {
  return (
    <div className="tooltip-container">
      <button
        className="buttons-trigger modern-three-dots mark-unread-button"
        onClick={onClick}
        aria-label="Mark as unread"
      >
        <MdMarkEmailUnread size={20} />
      </button>
      <span className="tooltip-text">Mark as unread</span>
    </div>
  );
};

export default MarkUnreadButton;