import './MarkUnreadButton.css';

const MarkUnreadButton = ({ onClick }) => {
  return (
    <div className="tooltip-container">
      <button
        className="buttons-trigger modern-three-dots mark-unread-button"
        onClick={onClick}
        aria-label="Mark as unread"
      >
        <i className="bi bi-envelope-check" style={{ fontSize: 20 }}></i>
      </button>
      <span className="tooltip-text">Mark as unread</span>
    </div>
  );
};

export default MarkUnreadButton;