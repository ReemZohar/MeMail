import React, { useState, useEffect } from 'react';
import './LeftMenu.css';
import LabelMenu from '../LabelMenu/LabelMenu';
import CustomLabelMenu from '../CustomLabelMenu/CustomLabelMenu';
import NewMailButton from '../NewMailButton/NewMailButton';

function LeftMenu({ theme, onComposeClick, onLabelClick, activeFolder, initialActiveLabelId, token }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [labels, setLabels] = useState([]);
  const [activeLabelId, setActiveLabelId] = useState(initialActiveLabelId || null);

  useEffect(() => {
    if (!token) return;
    fetch(`http://localhost:9090/api/labels`, {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(setLabels)
      .catch(err => console.error("Failed to fetch labels", err));
  }, [token]);

  const toggleMenu = () => {
    setIsCollapsed(prev => !prev);
  };

  function handleFolderClick(folderName, isFavorite = false) {
    setActiveLabelId(null);
    onLabelClick(null, isFavorite, folderName, false);
  }

  function handleCustomLabelClick(labelId) {
    setActiveLabelId(labelId);
    onLabelClick(labelId, false, null, true);
  }

  return (
    <div className={`leftMenu ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="menu-toggle-container">
        <button className="menu-toggle-button" onClick={toggleMenu}>
          <i className="bi bi-list" style={{ fontSize: 24 }}></i>
        </button>
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="menu-logo"
          />
      </div>

      <NewMailButton theme={theme} onClick={onComposeClick} isCollapsed={isCollapsed} />

      <div className="built-in-labels">
        <LabelMenu
          theme={theme}
          onLabelClick={handleFolderClick}
          activeFolder={activeFolder}
          isCollapsed={isCollapsed}
        />
      </div>

      <div className="custom-labels">
        <CustomLabelMenu
          theme={theme}
          labels={labels}
          onLabelClick={handleCustomLabelClick}
          activeLabelId={activeLabelId}
          token={token}
          setLabels={setLabels}
          isCollapsed={isCollapsed}
        />
      </div>
    </div>
  );
}

export default LeftMenu;