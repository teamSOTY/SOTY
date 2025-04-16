import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import LogoSoty from '../../../assets/logoSoty.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white shadow-md relative z-30">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Desktop and Mobile Layout */}
        <div className="flex items-center justify-between">
          {/* Logo - replaced text with image */}
          <div className="font-bold text-teal-600 flex items-center">
            <Link to="/">
              <img src={LogoSoty} alt="SOTY Logo" className="h-8" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-700 hover:text-teal-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'text-emerald-600 font-semibold' : 'hover:text-emerald-500 transition-colors duration-300'
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? 'text-emerald-600 font-semibold' : 'hover:text-emerald-500 transition-colors duration-300'
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/faq"
                className={({ isActive }) =>
                  isActive ? 'text-emerald-600 font-semibold' : 'hover:text-emerald-500 transition-colors duration-300'
                }
              >
                Faq
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? 'text-emerald-600 font-semibold' : 'hover:text-emerald-500 transition-colors duration-300'
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/studentLogin"
                className={({ isActive }) =>
                  isActive ? 'text-emerald-600 font-semibold' : 'hover:text-emerald-500 transition-colors duration-300'
                }
              >
                Login
              </NavLink>
            </li>
            {/* Dropdown trigger - Desktop */}
            <li className="relative group">
              <div className="cursor-pointer hover:text-emerald-500">
                Registration
              </div>
              {/* Dropdown - Desktop */}
              <div className="absolute left-0 top-full mt-1 w-48 bg-white shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <NavLink
                  to="/register/institute"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#28d793] hover:text-white"
                >
                  Institute Registration
                </NavLink>
                <NavLink
                  to="/register/student"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#28d793] hover:text-white"
                >
                  Student Registration
                </NavLink>
              </div>
            </li>
          </ul>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`${
            isMenuOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'
          } md:hidden transition-all duration-300 overflow-hidden absolute left-0 right-0 top-full bg-white shadow-md z-20`}
        >
          <ul className="py-2 px-4 space-y-3 text-gray-700">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'text-emerald-600 font-semibold block py-2' : 'hover:text-emerald-500 transition-colors duration-300 block py-2'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? 'text-emerald-600 font-semibold block py-2' : 'hover:text-emerald-500 transition-colors duration-300 block py-2'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/faq"
                className={({ isActive }) =>
                  isActive ? 'text-emerald-600 font-semibold block py-2' : 'hover:text-emerald-500 transition-colors duration-300 block py-2'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Faq
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? 'text-emerald-600 font-semibold block py-2' : 'hover:text-emerald-500 transition-colors duration-300 block py-2'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/studentLogin"
                className={({ isActive }) =>
                  isActive ? 'text-emerald-600 font-semibold block py-2' : 'hover:text-emerald-500 transition-colors duration-300 block py-2'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
            </li>
            {/* Dropdown trigger - Mobile */}
            <li>
              <button 
                className="flex items-center justify-between w-full py-2 hover:text-emerald-500"
                onClick={toggleDropdown}
              >
                <span>Registration</span>
                <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {/* Dropdown - Mobile */}
              <div className={`pl-4 space-y-2 overflow-hidden transition-all duration-200 ${isDropdownOpen ? 'max-h-20 py-2' : 'max-h-0'}`}>
                <NavLink
                  to="/register/institute"
                  className="block text-gray-700 hover:text-emerald-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Institute Registration
                </NavLink>
                <NavLink
                  to="/register/student"
                  className="block text-gray-700 hover:text-emerald-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Student Registration
                </NavLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;