
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Slider from "react-slick";

// Slider
import S1 from '../../assets/gradMaterial/s1.png'; 
import S2 from '../../assets/gradMaterial/s2.png'; 
import S3 from '../../assets/gradMaterial/s3.png'; 
import S4 from '../../assets/gradMaterial/s4.png'; 
import S6 from '../../assets/gradMaterial/s6.png'; 
import S7 from '../../assets/gradMaterial/s7.png'; 
import S8 from '../../assets/gradMaterial/s8.png'; 
import S9 from '../../assets/gradMaterial/s9.png'; 
import S12 from '../../assets/gradMaterial/n3.png'; 
import S14 from '../../assets/gradMaterial/n5.png'; 


export default function Plants() {

  const [isLoading , setisLoading] = useState(false);


// Slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    
  };

  const [Plants, setPlants] = useState([{}]);

  function getPlants(){
   setisLoading(true);
      axios.get(`/api/library/getall`)
      .then( ({data})=>{
        console.log(data);
        setPlants(data)
        setisLoading(false);

      })
  }

  useEffect( ()=>{
    getPlants();
  } ,[] ) 


  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-green-950 via-green-800 to-green-50 z-50">
        <div className="relative flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-100 via-green-500 to-green-950 animate-bounce shadow-lg relative">
            {/* Inner Glow */}
            <div className="absolute inset-0 m-auto w-20 h-30 bg-green-500 rounded-full animate-bounce"></div>
          </div>
          <div className="absolute text-green-200 text-2xl font-bold animate-pulse scale-150">
          <i class="fa-solid fa-seedling"></i>
          </div>
        </div>
  
        <span className="homeFont text-green-100 mt-8 text-7xl font-extrabold tracking-wider animate-pulse delay-500">
          <span className="animate-pulse">P</span>
          <span className="animate-bounce">L</span>
          <span className="animate-pulse">a</span>
          <span className="animate-bounce">n</span>
          <span className="animate-pulse">t</span>
          <span className="animate-bounce">C</span>
          <span className="animate-pulse">a</span>
          <span className="animate-bounce">r</span>
          <span className="animate-pulse">e</span>
        </span>
      </div>
    );
  }
  

  return <>  
        <div className="bg-gray-200 pt-20">
            <motion.h2 className="homeFont font-extrabold sm:text-2xl lg:text-5xl text-center p-4" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}transition={{ duration: 1 }}>
                "Every drooping leaf is a story untold"
            </motion.h2>
          
      {/* Slider */}
        <div className="container row mx-auto justify-center p-8">
        
        <div className="w-full">
            <Slider className='pb-3 rounded-3xl' {...settings}>
  
                <img className='w-100 h-[400px] rounded-3xl' src={S3} />
                <img className='w-100 h-[400px]  rounded-3xl' src={S1} />
                <img className='w-100 h-[400px]  rounded-3xl' src={S2} />
                <img className='w-100 h-[400px]  rounded-3xl' src={S4} />
                <img className='w-100 h-[400px]  rounded-3xl' src={S6} />
                <img className='w-100 h-[400px]  rounded-3xl' src={S7} />
                <img className='w-100 h-[400px] rounded-3xl' src={S8} />
                <img className='w-100 h-[400px] rounded-3xl' src={S9} />
                <img className='w-100 h-[400px] rounded-3xl' src={S12} />
                <img className='w-100 h-[400px] rounded-3xl' src={S14} />
            </Slider>
        </div>

        </div>

      <div className='py-10'>
      <div className="row container mx-auto "> 


{/* Plants */}
  {!Plants || Plants.length === 0 ? (
  <div>No plants available</div>) : (
  Plants.map((plant) => (
    <div key={plant.imageId} className="w-1/4 p-2 my-4 ">
      <div className="plant mt-2 me-4">
        <Link to={`/plantDetails/${plant.diseaseId}`}>
          <img className="w-full h-48 rounded-2xl" src={plant.imageUrl} alt={plant.plantName || "Unknown Plant"} />
          <span className="block text-center p-2 text-green-700">{plant.plantName || "Unknown Plant"}</span>
          <h3 className="text-lg font-normal text-center text-gray-800 mb-4">
            {plant.diseaseName 
              ? plant.diseaseName.split('_').slice(0, 3).join(' ') 
              : "No name available"}
          </h3>
          <button className="btn rounded-md px-4">Click to Know More</button>
        </Link>
      </div>
    </div>
  ))
)}

</div>
</div>
        </div>

  </>
}
