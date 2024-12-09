import React from 'react';
// import lanPictue from '../../assets/gradMaterial/landing.png'; 
// import lanPictue from '../../assets/gradMaterial/Frame 87.png'; 
import Footer from '../Footer/Footer';
import { motion } from 'framer-motion';

import F1 from '../../assets/gradMaterial/Frame 86.png'; 
import F2 from '../../assets/gradMaterial/Frame 87.png'; 
import F3 from '../../assets/gradMaterial/plants/1.jpg'; 
import F4 from '../../assets/gradMaterial/Frame 89.png'; 
import F5 from '../../assets/gradMaterial/Frame 90.png'; 
import F6 from '../../assets/gradMaterial/Frame 91.png'; 
import F7 from '../../assets/gradMaterial/Frame 95.png'; 
import F8 from '../../assets/gradMaterial/12.png'; 

const images = [
    { id: 1, src: F1, alt: "Tomato with early blight", caption: "Tomato with early blight" },
    { id: 2, src: F2, alt: "Tomato showing signs of powdery mildew", caption: "Tomato powdery mildew" },
    { id: 3, src: F3, alt: "Leaf with bacterial spots", caption: "Leaf with bacterial spots" },
    { id: 4, src: F4, alt: "Yellowing wheat due to rust disease", caption: "Yellowing wheat rust disease" },
    { id: 5, src: F5, alt: "Wilted plant leaves", caption: "Wilted plant leaves" },
    { id: 6, src: F6, alt: "Healthy plant", caption: "Healthy plant" },
    { id: 7, src: F7, alt: "Plant with nutrient deficiency", caption: "Plant with nutrient deficiency" },
    { id: 8, src: F8, alt: "Healthy green leaf", caption: "Healthy green leaf" },
  ];
  


export default function Landing() {
  return <>
    <div className="FirstLanding flex items-center justify-center">
        <div className="py-32 text-center">
            <h1 className="font text-white font-extrabold mb-10">Find your plant to <br></br> care here</h1>
            <div className="anim-parent ">
                <div className="anim font text-white font-extrabold mb-10"></div>
            </div>
            <p className=" text-white pb-8 font-bold text-xl mb-6">
                Plant care involves several key aspects <br></br> 
                to ensure your plants remain healthy <br></br> and thrive
            </p>
        </div>
    </div>

    <div className="pt-16 pb-28 regiserBack">
    <h1 className="font Color text-center font-extrabold mb-10">What’s troubling your plant </h1>

        <div className="max-w-7xl mx-auto container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {images.map((image) => (
                <motion.div
                    key={image.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
                >
                    <img src={image.src} alt={image.caption} className="h-64 w-96 rounded-lg object-cover" />
                    <div className="p-10 text-center">
                        <p className=" text-green-950 font-semibold">{image.caption}</p>
                    </div>
                </motion.div>
            ))}
            
        </div>
            <div className='mt-24 mx-auto flex justify-center bg-gray-50 p-10 rounded-lg'>
                            <a href="/login">
                                <p className='homeFont text-4xl font-bold text-center max-w-md md:max-w-lg text-gray-600 bg-gradient-to-r from-green-400 via-gray-700 to-green-900 text-transparent bg-clip-text animate-pulse'>Click to know more about plant's World </p>
                            </a>
            </div>
    </div>

    <Footer />
  </>;
}
