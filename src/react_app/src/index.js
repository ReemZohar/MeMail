import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import NewMailWindow from './NewMailWindow/NewMailWindow'; // התאימי נתיב לפי מיקום הקובץ

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NewMailWindow />
    </BrowserRouter>
  </React.StrictMode>
);
