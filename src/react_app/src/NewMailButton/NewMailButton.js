import React from "react";
import { MdCreate } from "react-icons/md";
import "./NewMailButton.css";

export default function NewMailButton({ theme, isCollapsed, onClick }) {
  return (
    <button
      className={`newMail-button ${theme === "dark" ? "dark" : "light"} ${
        isCollapsed ? "collapsed" : ""
      }`}
      onClick={onClick}
    >
      <MdCreate size={20} className="newMail-icon" />
      {!isCollapsed && <span className="text">Compose</span>}
    </button>
  );
}
