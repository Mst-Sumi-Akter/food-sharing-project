import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import logo from "../assets/1logo.png";
import { GoHomeFill } from "react-icons/go";
import { IoFastFood, IoLogIn, IoLogOut } from "react-icons/io5";
import { ImBoxAdd } from "react-icons/im";
import { FaUser } from "react-icons/fa6";
import { LuHeartHandshake } from "react-icons/lu";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully!");
      setMenuOpen(false);
    } catch (err) {
      console.error(err);
      alert("Logout failed!");
    }
  };

  const activeClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-2 text-white bg-gradient-to-r from-orange-500 to-pink-500 px-3 py-2 rounded-md"
      : "flex items-center gap-2 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 px-3 py-2 rounded-md transition";

  return (
    <nav className="bg-white shadow-md top-0 z-50 px-4 md:px-8 py-2 rounded-4xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-orange-500"
        >
          <img src={logo} alt="PlateShare Logo" className="h-12 w-auto" />
          PlateShare
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-4">
          <NavLink to="/" className={activeClass}>
            <GoHomeFill /> Home
          </NavLink>
          <NavLink to="/available-foods" className={activeClass}>
            <IoFastFood /> Available Foods
          </NavLink>
          {user && (
            <>
              <NavLink to="/add-food" className={activeClass}>
                <ImBoxAdd /> Add Food
              </NavLink>
              <NavLink to="/manage-foods" className={activeClass}>
                <FaUser /> Manage My Foods
              </NavLink>
              <NavLink to="/my-requests" className={activeClass}>
                <LuHeartHandshake /> My Requests
              </NavLink>
            </>
          )}
        </ul>

        {/* User / Auth Buttons */}
        <div className="flex items-center gap-3 relative">
          {user ? (
            <div>
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="User"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-orange-400"
                onClick={() => setMenuOpen(!menuOpen)}
              />
              {menuOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  <li className="px-4 py-2 text-gray-800 font-bold flex items-center gap-2">
                    {user.displayName}
                  </li>
                  <li className="px-4 py-2 text-gray-600 text-sm">{user.email}</li>
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                      onClick={() => setMenuOpen(false)}
                    >
                      <FaUser /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/my-requests"
                      className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                      onClick={() => setMenuOpen(false)}
                    >
                      <LuHeartHandshake /> My Requests
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2  text-red-600 hover:bg-red-100 font-semibold flex items-center gap-2"
                    >
                      <IoLogOut /> Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded font-semibold flex items-center gap-2"
              >
                <IoLogIn /> Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-semibold flex items-center gap-2"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden ml-2 text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden mt-2 bg-white shadow-lg rounded-md p-2 flex flex-col gap-2">
          <NavLink to="/" className={activeClass} onClick={() => setMenuOpen(false)}>
            <GoHomeFill /> Home
          </NavLink>
          <NavLink to="/available-foods" className={activeClass} onClick={() => setMenuOpen(false)}>
            <IoFastFood /> Available Foods
          </NavLink>
          {user && (
            <>
              <NavLink to="/add-food" className={activeClass} onClick={() => setMenuOpen(false)}>
                <ImBoxAdd /> Add Food
              </NavLink>
              <NavLink to="/my-foods" className={activeClass} onClick={() => setMenuOpen(false)}>
                <FaUser /> Manage My Foods
              </NavLink>
              <NavLink to="/my-requests" className={activeClass} onClick={() => setMenuOpen(false)}>
                <LuHeartHandshake /> My Requests
              </NavLink>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-100 font-semibold flex items-center gap-2 rounded-md"
              >
                <IoLogOut /> Logout
              </button>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
