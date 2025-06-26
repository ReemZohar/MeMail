import './ReplyButton.css';

const ReplyButton = ({ onClick }) => {
  return (
    <div className="tooltip-container">
      <button
        className="buttons-trigger modern-three-dots reply-button"
        onClick={onClick}
        aria-label="Reply"
      >
        <i className="bi bi-reply" style={{ fontSize: 20 }}></i>
      </button>
      <span className="tooltip-text">Reply</span>
    </div>
  );
};

export default ReplyButton;