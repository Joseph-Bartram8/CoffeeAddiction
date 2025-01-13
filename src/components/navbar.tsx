import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
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
            className="text-gray-800 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-300 transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-800 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-300 transition"
          >
            About
          </Link>
        </nav>

        {/* Light/Dark Mode Toggle */}
        <div>
          <button
            onClick={() => {
              const html = document.documentElement;
              if (html.classList.contains('dark')) {
                html.classList.remove('dark');
                localStorage.setItem('theme', 'light');
              } else {
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
              }
            }}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-lg"
          >
            Toggle Mode
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
