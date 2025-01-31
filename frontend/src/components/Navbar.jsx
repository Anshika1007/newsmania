import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSignInAlt, FaUserPlus, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    // Check login status using localStorage or other methods
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token on logout
    setIsLoggedIn(false);
    setShowUserMenu(false);
  };

  return (
    <nav className="bg-black text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold">NewsMania</h1>

        {/* Hamburger Menu */}
        <div className="md:hidden flex items-center ml-auto">
          {!isMenuOpen && (
            <button onClick={toggleMenu} className="text-2xl">
              <GiHamburgerMenu />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:justify-center md:w-full flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 text-center`}
        >
          <li>
            <Link to="/" className="hover:underline" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/categories"
              className="hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
          </li>
        </ul>

        {/* Right Section: Auth Links or User Icon */}
        <div className="relative">
          {isLoggedIn ? (
            <div
              className="cursor-pointer flex items-center space-x-2"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <FaUserCircle className="text-2xl" />
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="flex items-center space-x-1 hover:underline"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaSignInAlt />
                <span>Login</span>
              </Link>
              <Link
                to="/signup"
                className="flex items-center space-x-1 hover:underline"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaUserPlus />
                <span>Signup</span>
              </Link>
            </div>
          )}
          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 bg-white text-black rounded shadow-md mt-2">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link to="/profile" onClick={() => setShowUserMenu(false)}>
                    Profile
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




