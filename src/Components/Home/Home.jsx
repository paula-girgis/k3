
import React from 'react'
import Footer from '../Footer/Footer'
import { motion } from 'framer-motion';

import F1 from '../../assets/gradMaterial/Frame 86.png'; 
import F2 from '../../assets/gradMaterial/Frame 87.png'; 
import F3 from '../../assets/gradMaterial/plants/1.jpg'; 
import F4 from '../../assets/gradMaterial/Frame 89.png'; 
import F5 from '../../assets/gradMaterial/Frame 90.png'; 
import F6 from '../../assets/gradMaterial/Frame 91.png'; 
import F7 from '../../assets/gradMaterial/Frame 95.png'; 
import F8 from '../../assets/gradMaterial/12.png'; 
import F9 from '../../assets/gradMaterial/plants/2.jpg'; 
import F10 from '../../assets/gradMaterial/plants/3.jpg'; 
import F11 from '../../assets/gradMaterial/plants/4.jpg'; 
import F12 from '../../assets/gradMaterial/plants/5.jpg'; 
import F13 from '../../assets/gradMaterial/plants/6.jpg'; 
import F14 from '../../assets/gradMaterial/plants/7.jpg'; 
import F15 from '../../assets/gradMaterial/plants/8.jpg'; 
import F16 from '../../assets/gradMaterial/plants/9.jpg'; 




const images = [
  { id: 1, src: F9, alt: "Tomato with early blight", caption: "Tomato with early blight" },
  { id: 2, src: F10, alt: "Tomato showing signs of powdery mildew", caption: "Tomato powdery mildew" },
  { id: 3, src: F11, alt: "Leaf with bacterial spots", caption: "Leaf with bacterial spots" },
  { id: 4, src: F12, alt: "Yellowing wheat due to rust disease", caption: "Yellowing wheat rust disease" },
  { id: 5, src: F13, alt: "Wilted plant leaves", caption: "Wilted plant leaves" },
  { id: 12, src: F7, alt: "Healthy tomato plant", caption: "Healthy tomato plant" },
  { id: 10, src: F5, alt: "Plant with leaf curl virus", caption: "Plant with leaf curl virus" },
  { id: 11, src: F6, alt: "Fungal infection on leaves", caption: "Fungal infection on leaves" },
  { id: 9, src: F4, alt: "Sunburned leaf", caption: "Sunburned leaf" },
  { id: 16, src: F16, alt: "Healthy wheat field", caption: "Healthy wheat field" },
  { id: 13, src: F8, alt: "Infected vegetable plant", caption: "Infected vegetable plant" },
  { id: 14, src: F14, alt: "Brown spots on leaves", caption: "Brown spots on leaves" },
  { id: 6, src: F1, alt: "Healthy plant", caption: "Healthy plant" },
  { id: 7, src: F2, alt: "Plant with nutrient deficiency", caption: "Plant with nutrient deficiency" },
  { id: 8, src: F3, alt: "Healthy green leaf", caption: "Healthy green leaf" },
  { id: 15, src: F15, alt: "Plant showing signs of stress", caption: "Plant showing signs of stress" },
];

export default function Home() {
  return (
    <>

    
      {/* Home top */}
      <div className="homeBack flex justify-center sm:px-6 lg:px-8">
        <section className="pt-28 pe-48 sm:pt-24 lg:pt-28 lg:pe-48 w-full lg:w-auto">
          <motion.h2
            className="homeFont font-extrabold sm:text-4xl lg:text-7xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Take care of your plants
          </motion.h2>

          <motion.p
            className="text-xl mt-6 sm:text-xl sm:mt-6 text-gray-900 text-justify"
            style={{ textAlign: "justify" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Welcome to our Plant Disease Detection Hub. Our platform offers
            professional guidance <br /> customized for your plants and assists
            you in identifying plant illnesses. <br /> Consult with other plant
            enthusiasts and get advice on maintaining <br /> your plants'
            health.
          </motion.p>

          {/* Motivational Quote */}
          <motion.div
            className="mt-8 sm:mt-10 lg:mt-12 text-start text-xl sm:text-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p className="text-gray-600 italic">
              "Healthy plants, happy life!"
            </p>
          </motion.div>
        </section>
      </div>



      {/* Plant Diseases Section */}
      <section className="bgColor">
        <motion.h3
          className="homeFont text-center  p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Discover Healthy & Infected Plants
        </motion.h3>

        <div className="container mx-auto pb-14">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {images.map((image) => (
              <motion.div
                key={image.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="overflow-hidden plant gap-10 h-auto mb-16 rounded-lg shadow-lg cursor-pointer flex flex-col"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <p className="text-center justify-center items-center p-4  text-gray-700">
                  {image.caption || "No description available"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <Footer />
    </>
  );
}
