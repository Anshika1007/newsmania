
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { 
  FaSignInAlt, FaUserPlus, FaUserCircle, FaSignOutAlt, 
  FaBookmark, FaHome, FaThList, FaPoll ,FaGamepad
} from "react-icons/fa";
import { GiWorld } from "react-icons/gi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("username"); 
      if (token && storedUser) {
        setIsLoggedIn(true);
        setUsername(storedUser);
      } else {
        setIsLoggedIn(false);
        setUsername("");
      }
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/");
  };

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-gray-800 p-3 rounded-full shadow-md transition-all"
      >
        <GiHamburgerMenu className="text-2xl" />
      </button>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white shadow-lg transform transition-transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 md:w-72 p-5 flex flex-col space-y-6`}
      >
        {/* Logo */}
        <h1 className="text-3xl font-bold text-white tracking-wide text-center">
          News<span className="text-red-500">Mania</span>
        </h1>

        {/* Navigation Links */}
        <ul className="space-y-2">
          <SidebarLink to="/" icon={<FaHome />} label="Home" setIsMenuOpen={setIsMenuOpen} />
          <SidebarLink to="/categories" icon={<FaThList />} label="Categories" setIsMenuOpen={setIsMenuOpen} />
          <SidebarLink to="/geo-news" icon={<GiWorld />}label="Location News" setIsMenuOpen={setIsMenuOpen} />
          <SidebarLink to="/bookmarks" icon={<FaBookmark />} label="Bookmarks" setIsMenuOpen={setIsMenuOpen} />
          <SidebarLink to="/polls" icon={<FaPoll />} label="Polls" setIsMenuOpen={setIsMenuOpen} />
          <SidebarLink to="/games" icon={<FaGamepad />} label="Games" setIsMenuOpen={setIsMenuOpen} />
        </ul>

        {/* Authentication Section */}
        <div className="mt-auto">
          {isLoggedIn ? (
            <div className="space-y-3">
              {/* User Info */}
              <div className="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg">
                <FaUserCircle className="text-3xl text-red-500" />
                <span className="font-medium text-white">{username}</span>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-500 text-white px-4 py-3 w-full rounded-lg transition duration-300 font-medium"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <AuthButton to="/login" icon={<FaSignInAlt />} label="Login" color="blue" setIsMenuOpen={setIsMenuOpen} />
              <AuthButton to="/signup" icon={<FaUserPlus />} label="Signup" color="green" setIsMenuOpen={setIsMenuOpen} />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

/* Sidebar Link Component */
const SidebarLink = ({ to, icon, label, setIsMenuOpen }) => (
  <li>
    <Link
      to={to}
      className="flex items-center space-x-3 p-3 rounded-lg transition duration-300 hover:bg-gray-800 text-white"
      onClick={() => setIsMenuOpen(false)}
    >
      {typeof icon === "string" ? <span className="text-xl">{icon}</span> : <span className="text-lg">{icon}</span>}
      <span className="font-medium">{label}</span>
    </Link>
  </li>
);

/* Auth Button Component */
const AuthButton = ({ to, icon, label, color, setIsMenuOpen }) => (
  <Link
    to={to}
    className={`flex items-center justify-center space-x-2 bg-${color}-600 hover:bg-${color}-500 text-white px-4 py-3 w-full rounded-lg transition duration-300 font-medium`}
    onClick={() => setIsMenuOpen(false)}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Navbar;
