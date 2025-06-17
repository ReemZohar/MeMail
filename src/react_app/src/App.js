import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import LoginPage from './LoginPage/LoginPage';

export default function App() {
  const token = 'mock-token'; //todo check if ok
  const currentUserEmail = 'li@gmail.com';

  return (
    <Routes>
     <Route path="/login" element={<LoginPage />} />
     <Route path="/mail" element={<MainPage token={token} currentUserEmail={currentUserEmail} />} />
     <Route path="/mail/compose" element={<MainPage token={token} currentUserEmail={currentUserEmail} />} />
     <Route path="/mail/:id" element={<MainPage token={token} currentUserEmail={currentUserEmail} />} />
    </Routes>

  );
}
