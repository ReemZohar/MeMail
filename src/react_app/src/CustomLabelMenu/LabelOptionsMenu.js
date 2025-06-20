import React, { useEffect, useRef } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import './LabelOptionsMenu.css';

function LabelOptionsMenu({ onEdit, onDelete, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
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
        <MdEdit style={{ verticalAlign: 'middle', marginRight: 6 }} />
        Edit
      </button>
      <button className="option-btn delete" onClick={onDelete}>
        <MdDelete style={{ verticalAlign: 'middle', marginRight: 6 }} />
        Remove label
      </button>
      <button className="option-btn close" onClick={onClose}>X</button>
    </div>
  );
}

export default LabelOptionsMenu;
