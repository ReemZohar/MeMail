import './ForwardButton.css';
import { MdForward } from 'react-icons/md';

const ForwardButton = ({ onClick }) => {
  return (
    <div className="tooltip-container">
      <button
        className="buttons-trigger modern-three-dots forward-button"
        onClick={onClick}
        aria-label="Forward"
      >
        <MdForward size={20} />
      </button>
      <span className="tooltip-text">Forward</span>
    </div>
  );
};

export default ForwardButton;