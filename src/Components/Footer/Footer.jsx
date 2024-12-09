
import React from 'react'
import plantCareLogo from '../../assets/gradMaterial/logo.png'; 


export default function Footer() {
  return <>

      <footer className="bgColor p-8 w-full bottom-0">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">


        {/* Left Section (Logo and Text) */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <div className="flex items-center justify-center md:justify-start">
            <img src={plantCareLogo} alt="PlantCare" className="mr-2"  />
          
          </div>
          <p className="text-gray-600  ms-6">We help you find care about your plant</p>
        </div>




        {/* Social Media Icons */}
        <div className="flex space-x-6 mb-6 md:mb-0">
          <a href="#" className="text-gray-500 hover:text-slate-200 bg-gray-200 hover:bg-green-800 rounded-full p-3 transition ease-in-out duration-300">
            <i class="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-500 hover:text-slate-200 bg-gray-200 hover:bg-green-800 rounded-full p-3 transition ease-in-out duration-300">
          <i class="fa-brands fa-instagram"></i>
          </a>
          <a href="#" className="text-gray-500 hover:text-slate-200 bg-gray-200 hover:bg-green-800 rounded-full p-3 transition ease-in-out duration-300">
            <i class="fa-brands fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-500 hover:text-slate-200 bg-gray-200 hover:bg-green-800 rounded-full p-3 transition ease-in-out duration-300">
            <i class="fa-brands fa-linkedin-in"></i>
          </a>
        </div>




        {/* Contact Information */}
        <div className="text-center md:text-right">
          <h3 className="text-lg text-left  font-bold text-gray-950 ">Contact</h3>
          <ul className="mt-2 text-gray-500">
            <li className="flex items-center">
              <i className="fa-solid fa-location-dot p-1" style={{ color: '1E1E1E' }}></i>
              121 King St, Melbourne den 3000, Australia
            </li>
            <li className="flex items-center mt-2">
              <i class="fa-solid fa-envelope p-1" style={{ color: '1E1E1E' }}></i>
              Info@example.com
            </li>
            <li className="flex items-center mt-2">
            <i class="fa-solid fa-phone p-1" style={{ color: '1E1E1E' }}></i>
              +91 999999999
            </li>
          </ul>
        </div>
      </div>



      <div className="text-center mt-8 text-gray-600">
        2024 all Right Reserved Term of use GREENMIND
      </div>
    </footer>
  </>
}
