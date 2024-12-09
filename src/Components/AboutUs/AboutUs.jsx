

import React from 'react'
import { motion } from 'framer-motion';
import WebPhoto from '../../assets/gradMaterial/web.webp'; 
import donia from '../../assets/gradMaterial/donia.png'; 
import Menna from '../../assets/gradMaterial/menna.png'; 



export default function AboutUs() {
  return <>
  
  <div className="regiserBack min-h-screen py-16">
  <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
  className="md:text-6xl font font-bold Color text-center pt-10">"Meet PlantCare's team"</motion.h1>

      {/* Team */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Team Member */}
          {/* Doonya */}
          <div className="text-center bg-gray-200 p-10 shadow-md rounded-lg">
            <img
              src={donia}
              alt="Donia Zeid"
              className="w-full h-72 object-cover rounded-xl mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              Donia Zeid
            </h3>
            <p className="text-sm text-gray-900">FrontEnd Developer</p>
          </div>

          {/* Paula */}
          <div className="text-center bg-gray-100 p-4 shadow-md rounded-lg">
            <img src="https://via.placeholder.com/150" alt="Paula Gerges" className="w-full h-32 object-cover rounded-lg mb-4"/>
            <h3 className="text-lg font-semibold text-gray-800">Paula Gerges</h3>
            <p className="text-sm text-gray-600">AI Developer</p>
          </div>


            {/* Akram */}
          <div className="text-center bg-gray-100 p-4 shadow-md rounded-lg">
            <img
              src="https://via.placeholder.com/150"
              alt="Akram Benyameen"
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              Akram Benyameen
            </h3>
            <p className="text-sm text-gray-600">BackEnd Developer</p>
          </div>

            {/* Menna */}
            <div className="text-center bg-gray-200 p-10 shadow-md rounded-lg">
            <img
              src={Menna}
              alt="Menna Magdy"
              className="w-full h-72 object-cover rounded-xl mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              Menna Magdy
            </h3>
            <p className="text-sm text-gray-900">Ui/Ux Designer</p>
          </div>

          
        </div>
      </section>

      {/* Content  */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>

          <p className="text-gray-700 text-lg leading-relaxed mb-4">
          <span className='font-bold text-green-900'>PlantCare</span>, where AI meets agriculture to support farmers, gardeners, and plant lovers. Our platform uses advanced AI technology to detect plant diseases from photos you upload. <br /> Then, explains the causes, and recommends tailored solutions to keep your plants thriving
          Beyond disease detection, our platform offers a rich library filled with detailed information about plants, their common diseases, and effective remedies. Whether you're solving a problem or learning more about plant care, PlantCare is here to guide you
          We strive to simplify plant care with smart solutions, enabling you to grow healthier, happier plants and cultivate a greener future together
          Your Plants. Our Expertise. <br /> A Greener Tomorrow...
          </p>
          
        </div>


        {/* Image */}
        <div className=''> 
          <img src={WebPhoto}  alt="Team working" className="w-[900px] h-[390px] ps-3 rounded-xl shadow-md"/>
        </div>

      </section>

    </div>
    </>
}

