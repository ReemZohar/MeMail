import React from 'react';
import ReactDOM from 'react-dom/client';
import UserInformation from './UserInformation/UserInformation'
import MailRow from './MailRow/MailRow';
import ChooseAvatarCard from './RegisterPage/RegisterCards/ChooseAvatarCard/ChooseAvatarCard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChooseAvatarCard theme={"light"}/>
  </React.StrictMode>
);