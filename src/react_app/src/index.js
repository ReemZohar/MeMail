import React from 'react';
import ReactDOM from 'react-dom/client';
import MailItem from './MailItem/MailItem';
import DarkModeButton from './DarkModeButton/DarkModeButton';

const exampleMail = {
  id: "1234",
  sender: "alice@example.com",
  title: "Hello from example",
  content: "This is a test mail content. It might be a bit long so we can see the snippet effect.",
  folder: "inbox",
  date: new Date().toISOString(),
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MailItem 
      mail={exampleMail}
      onMailDeleted={(id) => console.log("Deleted mail:", id)}
      onMailMovedToSpam={(id) => console.log("Moved mail to spam:", id)}
    />
    <DarkModeButton />
  </React.StrictMode>
);