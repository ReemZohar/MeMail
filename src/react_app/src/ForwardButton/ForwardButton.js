import './ForwardButton.css';

const ForwardButton = ({ onClick }) => {
  return (
    <div className="tooltip-container">
      <button
        className="buttons-trigger modern-three-dots forward-button"
        onClick={onClick}
        aria-label="Forward"
      >
        <i className="bi bi-arrow-return-right forward-icon"></i>
      </button>
      <span className="tooltip-text">Forward</span>
    </div>
  );
};

export default ForwardButton;