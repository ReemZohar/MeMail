import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MdInbox } from 'react-icons/md';
import UserInformation from './UserInformation/UserInformation'
import LeftMenu from './LeftMenu/LeftMenu'
import CustomLabelMenu from './CustomLabelMenu/CustomLabelMenu'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/*All pages*/}
      </Routes>
      {/* Static - in all pages*/}
         <LeftMenu
      theme="light"
      activeLabelId={null}
      clickOnLabel={(id) => console.log('Label clicked:', id)}
      onComposeClick={() => console.log('Compose clicked')}
    />
    </BrowserRouter>
  </React.StrictMode>
);