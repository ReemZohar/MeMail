import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage'

//Get the email (username) from the token
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const currentUserEmail = token ? parseJwt(token)?.username : null;

  useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage setToken={setToken} />} />
      {token ? (
        <>
          <Route path="/mail" element={<MainPage token={token} currentUserEmail={currentUserEmail} />} />
          <Route path="/mail/compose" element={<MainPage token={token} currentUserEmail={currentUserEmail} />} />
          <Route path="/mail/:id" element={<MainPage token={token} currentUserEmail={currentUserEmail} />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}