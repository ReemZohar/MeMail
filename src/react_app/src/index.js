import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MdInbox } from 'react-icons/md';
import UserInformation from './UserInformation/UserInformation'
import SpamMailButton from './SpamMailButton/SpamMailButton';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/*All pages*/}
      </Routes>
      {/* Static - in all pages*/}
          <SpamMailButton    />
    </BrowserRouter>
  </React.StrictMode>
);
