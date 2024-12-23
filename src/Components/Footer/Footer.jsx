
import React from 'react'
import plantCareLogo from '../../assets/gradMaterial/logo.png';

export default function Footer() {
  return (
    <footer className="bgColor p-8 w-full shadow-lg">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-900">

        {/* Logo and Description Section */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <div className="flex items-center justify-center md:justify-start">
            <img src={plantCareLogo} alt="PlantCare" className="w-full h-40" />
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6 mb-6 md:mb-0">
          <a
            href="https://www.instagram.com/plantcarehti/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-white bg-gray-200 hover:bg-green-800 rounded-full p-3 transition ease-in-out duration-300"
          >
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a
            href="https://www.instagram.com/plantcarehti/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-white bg-gray-200 hover:bg-green-800 rounded-full p-3 transition ease-in-out duration-300"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a
            href="https://www.instagram.com/plantcarehti/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-white bg-gray-200 hover:bg-green-800 rounded-full p-3 transition ease-in-out duration-300"
          >
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a
            href="https://www.instagram.com/plantcarehti/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-white bg-gray-200 hover:bg-green-800 rounded-full p-3 transition ease-in-out duration-300"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
        </div>

        {/* Contact Information Section */}
        <div className="text-center md:text-right">
          <ul className="mt-2 text-gray-600 text-sm">
            <li className="flex items-center justify-center md:justify-start mt-2">
              <i className="fa-solid fa-location-dot p-1" style={{ color: '#333' }}></i>
              Cairo, Egypt
            </li>
            <li className="flex items-center justify-center md:justify-start mt-2">
              <i className="fa-solid fa-envelope p-1" style={{ color: '#333' }}></i>
              plantcare.hti@gmail.com
            </li>
       
            <li className="flex items-center justify-center md:justify-start mt-2">
              <i className="fa-solid fa-phone p-1" style={{ color: '#333' }}></i>
              01204548235
            </li>
          </ul>
        </div>
      </div>

    
    </footer>
  );
}
