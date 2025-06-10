import React from 'react';
import ReactDOM from 'react-dom/client';
import UserInformation from './UserInformation/UserInformation'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserInformation requiredInfo={"Lian"} theme={"dark"}/>
    <UserInformation.Password requiredInfo={"Lian"} theme={"light"}/>
    <UserInformation.Month theme={"dark"}/>
    <UserInformation.Gender theme={"dark"}/>
    <UserInformation.Date requiredInfo={"Year"} theme={"dark"}/>
    <UserInformation.Date requiredInfo={"Day"} theme={"dark"}/>
  </React.StrictMode>
);