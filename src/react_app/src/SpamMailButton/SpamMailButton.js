import './SpamMailButton.css';

const SpamMailButton = ({ onClick }) => {
  return (
    <div className="tooltip-container">
      <button
        className="spamMail-button"
        onClick={onClick}
        aria-label="Mark as spam"
      >
        <i className="bi bi-exclamation-triangle spam-icon"></i>
      </button>
      <span className="tooltip-text">Report spam</span>
    </div>
  );
};

export default SpamMailButton;