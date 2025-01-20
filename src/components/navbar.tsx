import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { Configuration, UserApi } from "../generated-client"; // Import API client

interface User {
  userId: number;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: Date | null;
}

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    setDropdownOpen(false);
    navigate("/login");
  };

  const getRandomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <header className="bg-[#c8c8c8] shadow-md relative z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Page Title */}
        <Link
          to="/"
          className="text-2xl font-bold text-[#333] hover:text-[#000] transition"
        >
          Coffee Addiction
        </Link>
        {/* Navigation Links */}
        <nav className="flex-1 flex justify-center space-x-12">
          <Link
            to="/"
            className="text-[#333] hover:text-[#000] transition relative group"
          >
            Home
            <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-black group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/Origins"
            className="text-[#333] hover:text-[#000] transition relative group"
          >
            Origins
            <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-black group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>{" "}
        <Link
          to="/login"
          className="block px-4 py-2 text-center text-sm hover:bg-[#e0e0e0] text-[#333] transition"
          onClick={() => setDropdownOpen(false)}
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="block px-4 py-2 text-center text-sm hover:bg-[#e0e0e0] text-[#333] transition"
          onClick={() => setDropdownOpen(false)}
        >
          Signup
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
