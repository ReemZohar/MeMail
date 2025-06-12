import "./NewMailButton.css";
import { MdEdit } from "react-icons/md";

function NewMailButton({ theme, onClick }) {
    return (
        <button
            className="compose-button"
            data-bs-theme={theme}
            onClick={onClick}
        >
            <MdEdit className="compose-icon" />
            Compose
        </button>
    );
}

export default NewMailButton;