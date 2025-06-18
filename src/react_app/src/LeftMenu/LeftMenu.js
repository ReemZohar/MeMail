import React, { useState } from 'react';
import './LeftMenu.css';
import { MdMenu } from 'react-icons/md';
import LabelMenu from '../LabelMenu/LabelMenu';
import CustomLabelMenu from '../CustomLabelMenu/CustomLabelMenu';
import NewMailButton from '../NewMailButton/NewMailButton';

function LeftMenu({ theme, onComposeClick, clickOnLabel, activeLabelId }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <div className={`leftMenu ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="menu-toggle-container">
        <button className="menu-toggle-button" onClick={toggleMenu}>
          <MdMenu size={24} />
        </button>
      </div>

      <NewMailButton theme={theme} onClick={onComposeClick} isCollapsed={isCollapsed} />

      <div className="built-in-labels">
        <LabelMenu
          theme={theme}
          clickOnLabel={clickOnLabel}
          activeLabelId={activeLabelId}
          isCollapsed={isCollapsed}
        />
      </div>

      <div className="custom-labels">
        <CustomLabelMenu
          theme={theme}
          clickOnLabel={clickOnLabel}
          activeLabelId={activeLabelId}
          isCollapsed={isCollapsed}
        />
      </div>
    </div>
  );
}

export default LeftMenu;
