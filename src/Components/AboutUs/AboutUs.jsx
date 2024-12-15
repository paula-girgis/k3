

import React from 'react'
import { motion } from 'framer-motion';
import Web from '../../assets/gradMaterial/WEB2.jpg'; 

export default function AboutUs() {
  return <>
  
  <div className="regiserBack"> 

    <div className="container regiserBack mx-auto min-h-screen py-20">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }} 
        className="text-6xl font-extrabold font text-green-950 text-center py-8"
      >
         "Minds Behind PlantCare"
      </motion.h1>




      {/* Content Section */}
      <section className="max-w-7xl mx-auto py-16 grid grid-cols-1 gap-12">

        <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5 }}className="flex flex-col justify-center px-8">
          <p className="text-gray-900 text-xl container mx-auto text-center  leading-relaxed mb-6">
            PlantCare leverages cutting-edge AI to diagnose plant diseases, explain their causes, and provide tailored solutions. With our vast library of plant care tips and remedies, we make it easier to grow healthy plants and nurture a greener world. Let us help you bring your plants to life.
          </p>
        </motion.div>

   
        <motion.div 
          initial={{ opacity: 0, x: 100 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1.5 }}
        >
          <img 
            src={Web} 
            alt="Team working" 
            className="w-full h-full container mx-auto object-cover rounded-xl shadow-2xl"
          />
        </motion.div>

      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-10 py-10">
        <h2 className="text-6xl text-center text-green-950 font-semibold py-6 font">Our Team</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 mt-6 md:grid-cols-4 gap-12">
          {/* Donia */}
          <motion.div 
            className="text-center bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }}
          >
            <img 
              src="https://via.placeholder.com/150" 
              alt="Donia Zeid" 
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">Donia Zeid</h3>
            <p className="text-sm text-gray-600">FrontEnd Developer</p>
          </motion.div>

          {/* Paula */}
          <motion.div 
            className="text-center bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }}
          >
            <img 
              src="https://via.placeholder.com/150" 
              alt="Paula Gerges" 
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">Paula Gerges</h3>
            <p className="text-sm text-gray-600">AI Developer</p>
          </motion.div>

          {/* Akram */}
          <motion.div 
            className="text-center bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }}
          >
            <img 
              src="https://via.placeholder.com/150" 
              alt="Akram Benyameen" 
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">Akram Benyameen</h3>
            <p className="text-sm text-gray-600">BackEnd Developer</p>
          </motion.div>

          {/* Menna */}
          <motion.div 
            className="text-center bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }}
          >
            <img 
              src="https://via.placeholder.com/150" 
              alt="Menna Magdy" 
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">Menna Magdy</h3>
            <p className="text-sm text-gray-600">UI/UX Designer</p>
          </motion.div>

        </div>
      </section>

    </div>

  </div>
  </>
}
