import React from 'react';
import { NavLink,Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold text-teal-600 flex items-center space-x-2">
          <div className="w-6 h-6 bg-teal-600 text-white rounded-sm flex items-center justify-center">S</div>
          <span>SOTY</span>
        </div>
        

<ul className="flex space-x-6 text-gray-700 font-medium">
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
  {/* Dropdown trigger */}
  <li className="relative group">
            <div className="cursor-pointer hover:text-emerald-500">
               Registration
            </div>

            {/* Dropdown */}
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
    </nav>
  );
};
export default Navbar;
