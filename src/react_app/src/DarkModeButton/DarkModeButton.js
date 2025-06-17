import { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import './DarkModeButton.css';

function DarkModeButton() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') ||
           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const thereState = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      className="DarkModeButton btn btn-outline-secondary"
      onClick={thereState}
      aria-label="dark/light mode"
    >
      {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
    </button>
  );
}

export default DarkModeButton;
