import React, { useState } from 'react';
import { applyTheme, getTheme } from '../theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getTheme());
  const flip = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    setTheme(next);
  };
  return (
    <button className="theme-btn" onClick={flip} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  );
}