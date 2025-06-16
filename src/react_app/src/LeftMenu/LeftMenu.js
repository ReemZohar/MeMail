import React, { useState, useEffect } from 'react';
import './LeftMenu.css';
import { MdMenu } from 'react-icons/md';
import LabelMenu from '../LabelMenu/LabelMenu';
import CustomLabelMenu from '../CustomLabelMenu/CustomLabelMenu';
import NewMailButton from '../NewMailButton/NewMailButton';

function LeftMenu({ theme, onComposeClick, clickOnLabel, activeLabelId, token }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [labels, setLabels] = useState([]);

  const toggleMenu = () => {
    setIsCollapsed(prev => !prev);
  };

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const res = await fetch('http://localhost:9090/api/labels', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error('Failed to fetch labels');
        const data = await res.json();
        setLabels(data);
      } catch (err) {
        console.error('Error loading labels:', err);
      }
    };

    fetchLabels();
  }, [token]);

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
          labels={labels}
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
