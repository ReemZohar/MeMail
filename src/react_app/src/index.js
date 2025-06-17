import React from 'react';
import ReactDOM from 'react-dom/client';
import UserInformation from './UserInformation/UserInformation'
import MailRow from './MailRow/MailRow';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MailRow 
  mailId="1234"
  title="Hello from example"
  content="This is a test mail content."
/>
  </React.StrictMode>
);