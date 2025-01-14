import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Persist and apply dark mode
  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <header className="bg-gray-100 dark:bg-gray-800 shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Coffee Addiction
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <Link
            to="/"
            className="text-gray-800 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-800 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-300"
          >
            About
          </Link>
        </nav>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="text-2xl focus:outline-none"
          aria-label="Toggle dark mode"
        >
          {darkMode ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
