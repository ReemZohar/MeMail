import React from 'react';
import ReactDOM from 'react-dom/client';
import UserInformation from './UserInformation/UserInformation'
import RegisterCard from './RegisterCard/RegisterCard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RegisterCard theme={"light"}/>
  </React.StrictMode>
);