import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <header className="bg-[#c8c8c8] shadow-md">
      <div className="container mx-auto p-4 flex items-center relative">
        {/* Page Title */}
        <Link
          to="/"
          className="absolute left-0 text-2xl font-bold text-[#333] hover:text-[#000] transition"
        >
          Coffee Addiction
        </Link>

        {/* Navigation Links */}
        <nav className="mx-auto flex space-x-12">
          <Link
            to="/"
            className="text-[#333] hover:text-[#000] transition relative group"
          >
            Home
            <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-black group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/about"
            className="text-[#333] hover:text-[#000] transition relative group"
          >
            About
            <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-black group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
