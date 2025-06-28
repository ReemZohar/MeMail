import React, { useRef } from 'react';
import './LabelOptionsMenu.css';

function LabelOptionsMenu({ onEdit, onDelete, onClose }) {
  const menuRef = useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="label-options-menu" ref={menuRef}>
       <button className="option-btn" onClick={onEdit}>
      <i className="bi bi-pencil icon-with-margin"></i>
      Edit
    </button>
    <button className="option-btn delete" onClick={onDelete}>
      <i className="bi bi-trash icon-with-margin"></i>
      Remove label
    </button>
      <button className="option-btn close" onClick={onClose}>X</button>
    </div>
  );
}

export default LabelOptionsMenu;