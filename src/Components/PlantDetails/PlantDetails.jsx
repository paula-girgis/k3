

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { motion } from 'framer-motion';

export default function PlantDetails() {
    let { id } = useParams();
    const [plantDetails, setPlantDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    function getPlantDetails(id) {
        axios.get(`/api/library/${id}`)
            .then(({ data }) => {

                console.log(data);
                setPlantDetails(data);  
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching plant details:", error);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        getPlantDetails(id);
    }, [id]);

    if (isLoading) {
        return (
            <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-green-950 via-green-800 to-green-50 z-50">
                <div className="relative flex items-center justify-center">
                    <div className="absolute text-green-200 text-2xl font-bold animate-pulse scale-150">
                        <i className="fa-solid fa-seedling"></i>
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

    return (
        <>
    <div className='regiserBack'>
        <div className="mx-auto container row py-28 ">

                <h1 className="text-xl mt-10 font-semibold text-green-900  p-5">
                    {plantDetails?.diseaseName || "Unknown Disease"}
                </h1>
                <img
                    className='w-full rounded-xl shadow-2xl h-96 m-5 mb-16'
                    src={plantDetails?.images?.[0]?.imageUrl || "https://via.placeholder.com/150"}
                    alt={plantDetails?.diseaseName || "Unknown Disease"}
                />
            <div className="w-2/4">

                {/* Cause Section */}
                <div className="bg-white p-6 rounded-xl shadow-xl">
  <h2 className="text-xl font-semibold text-green-700">Cause</h2>
  <p className="text-gray-700 mt-2">
    {plantDetails?.cause ? (
      (() => {
        const cause = plantDetails.cause;
        const treatmentIndex = cause.indexOf("Treatment");
        const extractedCause =
          treatmentIndex >= 0 ? cause.substring(0, treatmentIndex).trim() : cause;
        const extractedTreatment =
          treatmentIndex >= 0 ? cause.substring(treatmentIndex).trim() : "No treatment information available";

        return (
          <>
            <span>{extractedCause}</span>
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-green-700">Treatment</h2>
              <p className="text-gray-700 mt-2">{extractedTreatment}</p>
            </div>
          </>
        );
      })()
    ) : (
      "Cause not available"
    )}
  </p>
</div>
            </div>

            <div className="w-2/4 p-16">
                
                <div className="">
                    {/* Symptoms Section */}
                    <motion.div
                        className="mb-4  p-6 bg-green-700 text-white rounded-xl shadow-xl hover:scale-105 transform transition-all duration-300"
                        animate={{ x: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                    >
                        <h2 className="font-semibold text-lg">Symptoms</h2>
                        <p>{plantDetails?.symptoms || "Symptoms not available"}</p>
                    </motion.div>

                    {/* Images Section */}
                    <motion.div
                        className="mb-4 p-6 bg-yellow-700 text-white rounded-xl shadow-xl hover:scale-105 transform transition-all duration-300"
                        animate={{ x: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                    >
                        <h2 className="font-semibold text-lg">Images</h2>
                        <div className="flex gap-4 flex-wrap">
                            {/* Map through the images array and display each image */}
                            {plantDetails?.images?.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.imageUrl}  // Use imageUrl from each image object
                                    alt={`Plant Image ${index + 1}`}
                                    className="w-44 h-44 rounded-lg shadow-lg"
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    </div>

            <Footer />
        </>
    );

}
