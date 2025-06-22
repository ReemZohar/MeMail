import { MdReply } from 'react-icons/md';
import './ReplyButton.css';

const ReplyButton = ({ onClick }) => {
  return (
    <div className="tooltip-container">
      <button
        className="buttons-trigger modern-three-dots reply-button"
        onClick={onClick}
        aria-label="Reply"
      >
        <MdReply size={20} />
      </button>
      <span className="tooltip-text">Reply</span>
    </div>
  );
};

export default ReplyButton;