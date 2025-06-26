import "./NewMailButton.css";

export default function NewMailButton({ theme, isCollapsed, onClick }) {
  return (
    <button
      className={`newMail-button ${theme === "dark" ? "dark" : "light"} ${
        isCollapsed ? "collapsed" : ""
      }`}
      onClick={onClick}
    >
      <i className="bi bi-pencil" style={{ fontSize: 20 }}></i>
      {!isCollapsed && <span className="text">Compose</span>}
    </button>
  );
}