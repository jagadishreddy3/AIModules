import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Initial theme setup
    const savedTheme = localStorage.getItem('theme');
    
    // Check if user has a preference or use default (dark)
    const initialTheme = savedTheme ? savedTheme === 'dark' : true;
    
    setIsDark(initialTheme);
    if (initialTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-transparent dark:border-slate-700 active:scale-95"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-700" />}
    </button>
  );
};

export default ThemeToggle;
