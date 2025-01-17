import React, { useEffect, useState } from "react";
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
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const config = new Configuration({
        basePath: "http://localhost:3000",
      });
      const userApi = new UserApi(config);

      try {
        const response = await userApi.getUserById({ id: 1 }); // Replace `1` with dynamic user ID
        setUser(response.user || null);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    setUser(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  const getRandomColor = () => {
    const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const profileInitials =
    user?.firstName && user?.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`
      : "";

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
            className="text-[#333] hover:text-[#000] transition relative group">
            Home
            <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-black group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/Origins"
            className="text-[#333] hover:text-[#000] transition relative group">
            Origins
            <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-black group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 focus:outline-none"
          >
            {user ? (
              <>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getRandomColor()}`}
                >
                  {profileInitials}
                </div>
                <span className="text-[#333]">{`${user.firstName} ${user.lastName}`}</span>
              </>
            ) : (
              <span className="text-[#333] hover:text-[#000]">Login</span>
            )}
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg">
              <ul className="py-4 px-6 space-y-4">
                {user ? (
                  <>
                    <li className="text-sm text-[#333]">
                      Logged in as <strong>{`${user.firstName} ${user.lastName}`}</strong>
                    </li>
                    <hr className="border-gray-300" />
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-[#e0e0e0] text-[#333] transition"
                      >
                        Log Out
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex justify-center">
                      {/* Blank User Icon */}
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-8 h-8 text-gray-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 14v7m0 0H8m4 0h4"
                          />
                        </svg>
                      </div>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-center text-sm hover:bg-[#e0e0e0] text-[#333] transition"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Log In
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
