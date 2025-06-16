import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import MailList from './MailList/MailList';
import DarkModeButton from './DarkModeButton/DarkModeButton';
import LeftMenu from './LeftMenu/LeftMenu';
import MainPage from './MainPage/MainPage';

const exampleMails = [
  {
    id: "1",
  sender: "alice@example.com",
  title: "Welcome!",
  content: "Hi there, welcome to our app. We're excited to have you on board.",
  folder: "inbox",
  date: new Date().toISOString(),
  read: true,
  },
  {
    id: "2",
    sender: "bob@work.com",
    title: "Meeting schedule",
    content: "The next team meeting is scheduled for Monday at 10am. Please prepare your updates.",
    folder: "inbox",
    date: new Date(Date.now() - 86400000).toISOString(), // yesterday
  },
  {
    id: "3",
    sender: "carol@service.com",
    title: "Invoice #2024",
    content: "Dear customer, your invoice for the last month is attached. Thank you!",
    folder: "inbox",
    date: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
  },
  {
    id: "4",
    sender: "dave@security.com",
    title: "Password reset",
    content: "We noticed a login attempt from a new device. Click here to reset your password.",
    folder: "inbox",
    date: new Date(Date.now() - 3 * 86400000).toISOString(), // 3 days ago
  },
  {
    id: "5",
    sender: "newsletter@tech.com",
    title: "Top 10 JavaScript tips",
    content: "In this week's issue: 10 tips to improve your JavaScript skills and boost performance.",
    folder: "inbox",
    date: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
  },
  {
    id: "6",
    sender: "newsletter@tech.com",
    title: "Top 10 JavaScript tips",
    content: "In this week's issue: 10 tips to improve your JavaScript skills and boost performance.",
    folder: "inbox",
    date: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
  },
  {
    id: "7",
    sender: "newsletter@tech.com",
    title: "Top 10 JavaScript tips",
    content: "In this week's issue: 10 tips to improve your JavaScript skills and boost performance.",
    folder: "inbox",
    date: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
  },
  {
    id: "8",
    sender: "newsletter@tech.com",
    title: "Top 10 JavaScript tips",
    content: "In this week's issue: 10 tips to improve your JavaScript skills and boost performance.",
    folder: "inbox",
    date: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
  },
  {
    id: "9",
    sender: "newsletter@tech.com",
    title: "Top 10 JavaScript tips",
    content: "In this week's issue: 10 tips to improve your JavaScript skills and boost performance.",
    folder: "inbox",
    date: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
  },
  {
    id: "10",
    sender: "newsletter@tech.com",
    title: "Top 10 JavaScript tips",
    content: "In this week's issue: 10 tips to improve your JavaScript skills and boost performance.",
    folder: "inbox",
    date: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
  },
  {
    id: "11",
    sender: "newsletter@tech.com",
    title: "Top 10 JavaScript tips",
    content: "In this week's issue: 10 tips to improve your JavaScript skills and boost performance.",
    folder: "inbox",
    date: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
  },
  {
    id: "12",
    sender: "newsletter@tech.com",
    title: "Top 10 JavaScript tips",
    content: "In this week's issue: 10 tips to improve your JavaScript skills and boost performance.",
    folder: "inbox",
    date: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
  },
  {
    id: "13",
    sender: "newsletter@tech.com",
    title: "Top 10 JavaScript tips",
    content: "In this week's issue: 10 tips to improve your JavaScript skills and boost performance.",
    folder: "inbox",
    date: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
  },
  {
    id: "14",
    sender: "newsletter@tech.com",
    title: "Top 10 JavaScript tips",
    content: "In this week's issue: 10 tips to improve your JavaScript skills and boost performance.",
    folder: "inbox",
    date: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
  },
  {
    id: "15",
    sender: "newsletter@tech.com",
    title: "Top 10 JavaScript tips",
    content: "In this week's issue: 10 tips to improve your JavaScript skills and boost performance.",
    folder: "inbox",
    date: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
  },
  {
    id: "16",
    sender: "newsletter@tech.com",
    title: "Top 10 JavaScript tips",
    content: "In this week's issue: 10 tips to improve your JavaScript skills and boost performance.",
    folder: "inbox",
    date: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
  },
  {
    id: "147",
    sender: "newsletter@tech.com",
    title: "Top 10 JavaScript tips",
    content: "In this week's issue: 10 tips to improve your JavaScript skills and boost performance.",
    folder: "inbox",
    date: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
  },
  {
    id: "128",
    sender: "newsletter@tech.com",
    title: "Top 10 JavaScript tips",
    content: "In this week's issue: 10 tips to improve your JavaScript skills and boost performance.",
    folder: "inbox",
    date: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
  },
  {
    id: "19",
    sender: "newsletter@tech.com",
    title: "Top 10 JavaScript tips",
    content: "In this week's issue: 10 tips to improve your JavaScript skills and boost performance.",
    folder: "inbox",
    date: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
  },
];

const handleMailDeleted = (id) => {
  console.log("Deleted mail:", id);
};

const handleMailMovedToSpam = (id) => {
  console.log("Moved mail to spam:", id);
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MailList mails={exampleMails} onDelete={handleMailDeleted} onMarkSpam={handleMailMovedToSpam} />

    </BrowserRouter>
    <DarkModeButton />
  </React.StrictMode>
);

