import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const decodeToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload;
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
    return null;
  };

  const updateUserInfo = () => {
    const user = decodeToken();
    setUserInfo(user);
  };

  useEffect(() => {
    updateUserInfo();
    window.addEventListener("tokenChanged", updateUserInfo);
    return () => {
      window.removeEventListener("tokenChanged", updateUserInfo);
    };
  }, []);

  const handleLogout = () => {
    console.log("Logging out user:", userInfo?.id || "Guest");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("tokenChanged"));
    setUserInfo(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold">
            <Link to="/">Event Booking System</Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600">
              About
            </Link>
            <Link to="/services" className="text-gray-600 hover:text-blue-600">
              Services
            </Link>
            <Link to="/gallery" className="text-gray-600 hover:text-blue-600">
              Gallery
            </Link>
            <Link to="/book-now" className="text-gray-600 hover:text-blue-600">
              Book Now
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600">
              Contact Us
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {userInfo ? (
              <>
                <span className="text-gray-700 font-medium">
                  Welcome, {userInfo.role || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
        <div
          className={`md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } transition-all duration-300 ease-in-out`}
        >
          <ul className="space-y-4 pb-4 text-center">
            <li>
              <Link
                to="/"
                className="block text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="block text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/gallery"
                className="block text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/book-now"
                className="block text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </li>
            {userInfo ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
