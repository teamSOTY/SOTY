import React from "react";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/solid";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Social */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-green-600 rounded-sm"></div>
            <h2 className="text-2xl font-bold text-green-600">SOTY</h2>
          </div>
          <p className="text-gray-300 mb-4">Your Success is our mission.</p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="bg-gray-800 p-2 rounded-full hover:bg-gray-700"
            >
              <img
                src="https://img.icons8.com/ios-glyphs/24/ffffff/instagram-new.png"
                alt="Instagram"
              />
            </a>
            <a
              href="#"
              className="bg-blue-600 p-2 rounded-full hover:bg-blue-500"
            >
              <img
                src="https://img.icons8.com/ios-filled/24/ffffff/linkedin.png"
                alt="LinkedIn"
              />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Faq</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Student</a>
            </li>
            <li>
              <a href="#">Institute</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-lg mb-4">Contact Us</h3>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-center space-x-2">
              <PhoneIcon className="h-5 w-5 text-green-500" />
              <span>91-88827-96281</span>
            </li>
            <li className="flex items-center space-x-2">
              <EnvelopeIcon className="h-5 w-5 text-green-500" />
              <span>museruralspvtltd@gmail.com</span>
            </li>
            <li className="flex items-start space-x-2">
              <MapPinIcon className="h-5 w-5 text-green-500 mt-1" />
              <span>
                D-1/38, F/F Palam extention Sec-7 DwarK Opp. Vishal Mega Mart
                <br />
                New Delhi 110075
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-green-600 py-4 text-center text-white text-sm">
        © 2025 Scholaroftheyear. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
