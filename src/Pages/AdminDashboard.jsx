import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Navbar className="relative z-20" />
      <div className="pt-16">
        <header className="bg-gradient-to-r from-blue-700 to-sky-500 text-white shadow-lg fixed w-full z-10">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
            {/* Logo & Branding */}
            <Link to="/" className="flex items-center space-x-3">
              <span className="bg-white text-sky-700 px-3 py-1 rounded-full text-lg font-bold shadow-md">
                AP
              </span>
              <span className="text-2xl font-bold tracking-wide">
                Admin Panel
              </span>
            </Link>

            {/* Hamburger Icon for Mobile */}
            <button
              className="md:hidden text-white focus:outline-none"
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

            {/* Navigation Links */}
            <nav
              className={`${
                isMenuOpen
                  ? "block absolute top-full left-0 w-full bg-blue-700"
                  : "hidden"
              } md:relative md:flex md:flex-row md:space-x-6 mt-4 md:mt-0`}
            >
              <Link
                to="/all-users"
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                📋 <span>All Users</span>
              </Link>
              <Link
                to="/all-bookings"
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                📅 <span>All Bookings</span>
              </Link>
              <Link
                to="/all-events"
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                🎉 <span>All Events</span>
              </Link>
              <Link
                to="/create-event"
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                ➕ <span>Create Event</span>
              </Link>
              <Link
                to="/all-contacts"
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                📞 <span>All Contacts</span>
              </Link>
            </nav>

            {/* User Profile and Notifications */}
            <div className="hidden md:flex items-center space-x-5">
              <button className="text-white hover:text-yellow-300 transition duration-300">
                🔔
              </button>
              <button className="text-white hover:text-yellow-300 transition duration-300">
                👤
              </button>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default AdminDashboard;
