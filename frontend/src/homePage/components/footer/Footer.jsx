import React from "react";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import LogoSoty from "../../../assets/logoSoty.png"; // Adjust the path as needed

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo and Social */}
          <div className="mb-4 sm:mb-0">
            <div className="flex items-center mb-2">
              <Link to="/">
                <img src={LogoSoty} alt="SOTY Logo" className="h-8" />
              </Link>
            </div>
            <p className="text-gray-300 text-sm sm:text-base mb-4">Your Success is our mission.</p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/soty.2025/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-gray-700"
              >
                <img
                  src="https://img.icons8.com/ios-glyphs/24/ffffff/instagram-new.png"
                  alt="Instagram"
                  className="w-5 h-5"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/scholar-of-the-year-soty/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 p-2 rounded-full hover:bg-blue-500"
              >
                <img
                  src="https://img.icons8.com/ios-filled/24/ffffff/linkedin.png"
                  alt="LinkedIn"
                  className="w-5 h-5"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-4 sm:mb-0">
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Quick Links</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-y-2 text-sm sm:text-base text-gray-300">
              <li>
                <Link to="/" className="hover:text-green-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-green-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-green-400 transition-colors">Faq</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-green-400 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/register/student" className="hover:text-green-400 transition-colors">Student</Link>
              </li>
              <li>
                <Link to="/register/institute" className="hover:text-green-400 transition-colors">Institute</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-green-400 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-green-400 transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Contact Us</h3>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-300">
              <li className="flex items-center space-x-2">
                <PhoneIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                <a 
                  href="tel:+918882796281" 
                  className="hover:text-green-400 transition-colors"
                >
                  91-88827-96281
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <EnvelopeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                <a 
                  href="mailto:museruralspvtltd@gmail.com" 
                  className="break-all hover:text-green-400 transition-colors"
                >
                  museruralspvtltd@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-1 flex-shrink-0" />
                <a 
                  href="https://maps.google.com/?q=D-1/38, F/F Palam extention Sec-7 Dwarka New Delhi 110075" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm hover:text-green-400 transition-colors"
                >
                  D-1/38, F/F Palam extention Sec-7 Dwarka Opp. Vishal Mega Mart
                  <br />
                  New Delhi 110075
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-green-600 py-3 sm:py-4 text-center text-white text-xs sm:text-sm">
        © {new Date().getFullYear()} Scholaroftheyear. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;