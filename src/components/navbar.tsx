import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface User {
  firstName: string | null;
  lastName: string | null;
}

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profileColor, setProfileColor] = useState("");
  const navigate = useNavigate();

  // Generate a random profile color only once when the user is set
  const generateProfileColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const fetchUser = () => {
    const jwt = localStorage.getItem("jwt");
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");

    if (jwt && firstName && lastName) {
      setUser({
        firstName,
        lastName,
      });

      if (!profileColor) {
        setProfileColor(generateProfileColor());
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch user on initial load
  }, []); // Runs only on component mount

  useEffect(() => {
    const handleStorageChange = () => {
      fetchUser(); // Re-fetch user when localStorage changes
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Re-fetch user on navigation or component re-render
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("jwt");
    setUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

  const getProfileInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    }
    return "?";
  };

  return (
    <header className="bg-[#c8c8c8] shadow-md relative z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Page Title */}
        <Link
          to="/"
          className="text-2xl font-bold text-[#333] hover:text-[#000] transition hidden md:block" // Hidden on small screens
        >
          Coffee Addiction
        </Link>
        <Link
          to="/"
          className="text-xl font-bold text-[#333] hover:text-[#000] transition md:hidden" // Shown on small screens
        >
          CA
        </Link>

        {/* Navigation Links */}
        <nav className="flex-1 flex justify-center space-x-6 md:space-x-12">
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

          {/* Conditionally Render Dashboard */}
          {user && (
            <Link
              to="/dashboard"
              className="text-[#333] hover:text-[#000] transition relative group"
            >
              Dashboard
              <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
          )}
        </nav>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            {user ? (
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white bg-blue-500`}
              >
                {getProfileInitials()}
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
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
            )}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-20">
              <ul className="py-2">
                {user ? (
                  <>
                    <li className="px-4 py-2 text-sm text-gray-700">
                      Signed in as <strong>{`${user.firstName} ${user.lastName}`}</strong>
                    </li>
                    <hr className="border-gray-300" />
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200 text-gray-700 transition"
                      >
                        Log Out
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm hover:bg-gray-200 text-gray-700 transition"
                      >
                        Log In
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-sm hover:bg-gray-200 text-gray-700 transition"
                      >
                        Sign Up
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
