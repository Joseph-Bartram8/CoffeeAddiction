import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <header className="bg-[#c8c8c8] shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#333]">
          Coffee Addiction
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <Link to="/" className="text-[#333] hover:text-[#666]">
            Home
          </Link>
          <Link to="/about" className="text-[#333] hover:text-[#666]">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
