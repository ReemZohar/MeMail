import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MdInbox } from 'react-icons/md';
import UserInformation from './UserInformation/UserInformation';
import LeftMenu from './LeftMenu/LeftMenu';
import CustomLabelMenu from './CustomLabelMenu/CustomLabelMenu';
import DeleteMailButton from './DeleteMailButton/DeleteMailButton'; 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div>
        <Routes>
          {/* All pages */}
        </Routes>
        {/* Static - in all pages */}
        <DeleteMailButton onClick={() => console.log('Delete clicked!')} />

      </div>
    </BrowserRouter>
  </React.StrictMode>
);

