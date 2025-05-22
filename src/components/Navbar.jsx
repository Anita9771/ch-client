import React, { useState } from 'react';
import { FiMenu, FiX, FiUser, FiLogIn, FiLogOut } from 'react-icons/fi';

const Navbar = ({ isAuthenticated = false, onLogout = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'My Account', href: '/dashboard' },
    { label: 'Investments', href: '/investments' }
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-blue-600 font-bold text-2xl">Capital Haven</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <a href="/profile" className="text-gray-600 hover:text-blue-600 flex items-center text-sm font-medium">
                  <FiUser className="mr-1" /> Profile
                </a>
                <button
                  onClick={onLogout}
                  className="text-gray-600 hover:text-blue-600 flex items-center text-sm font-medium"
                >
                  <FiLogOut className="mr-1" /> Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="text-gray-600 hover:text-blue-600 flex items-center text-sm font-medium">
                  <FiLogIn className="mr-1" /> Login
                </a>
                <a href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300 flex items-center">
                  <FiUser className="mr-1" /> Register
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 pt-4 pb-3 space-y-1 bg-white border-t border-gray-200 shadow-md">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-4 border-t border-gray-100">
            {isAuthenticated ? (
              <>
                <a
                  href="/profile"
                  className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 text-base"
                >
                  <FiUser className="mr-2" /> Profile
                </a>
                <button
                  onClick={onLogout}
                  className="w-full text-left flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 text-base"
                >
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 text-base"
                >
                  <FiLogIn className="mr-2" /> Login
                </a>
                <a
                  href="/register"
                  className="flex items-center mt-2 px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md text-base font-medium"
                >
                  <FiUser className="mr-2" /> Register
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
