
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

    // Split Cause and Treatment text
    const causeText = plantDetails?.cause?.split('Treatment')[0]; 
    const treatmentText = plantDetails?.cause?.split('Treatment')[1];

    return (
        <>
            <div className='regiserBack'>
                <div className="mx-auto container row py-16">
                    <h1 className="text-xl mt-10 font-semibold text-green-900 p-3">
                        {plantDetails?.diseaseName || "Unknown Disease"}
                    </h1>
                    <img
                        className='w-full rounded-xl shadow-2xl h-96 m-5 mb-16'
                        src={plantDetails?.images?.[0]?.imageUrl || "https://via.placeholder.com/150"}
                        alt={plantDetails?.diseaseName || "Unknown Disease"}
                    />

                    {/* Grid layout for the 4 sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">

                        {/* Cause Section */}
                        <motion.div
                            className="p-6 bg-green-600 bg-opacity-40 rounded-3xl shadow-2xl hover:scale-105 transform transition-all duration-500"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <h2 className="text-xl font-semibold text-black">Cause</h2>
                            {causeText ? (
                                <div
                                    className="text-gray-900 mt-2 animate-shake"
                                    dangerouslySetInnerHTML={{ __html: causeText }}
                                />
                            ) : (
                                <p className="text-black">Cause not available</p>
                            )}
                        </motion.div>

                        {/* Treatment Section */}
                        <motion.div
                            className="p-6 bg-yellow-600 bg-opacity-40 rounded-3xl shadow-2xl hover:scale-105 transform transition-all duration-500"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2 }}
                        >
                            <h2 className="text-xl font-semibold text-black">Treatment</h2>
                            {treatmentText ? (
                                <div
                                    className="text-gray-900 mt-2 animate-shake"
                                    dangerouslySetInnerHTML={{ __html: treatmentText }}
                                />
                            ) : (
                                <p className="text-black">Treatment not available</p>
                            )}
                        </motion.div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-8">
                        {/* Symptoms Section */}
                        <motion.div
                            className="p-6 bg-green-700 bg-opacity-40 text-white rounded-3xl shadow-2xl hover:scale-105 transform transition-all duration-500"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.3 }}
                        >
                            <h2 className="font-semibold text-lg text-black">Symptoms</h2>
                            {plantDetails?.symptoms ? (
                                <div
                                    className="text-gray-900 mt-2 animate-shake"
                                    dangerouslySetInnerHTML={{ __html: plantDetails.symptoms }}
                                />
                            ) : (
                                <p className="text-black">Symptoms not available</p>
                            )}
                        </motion.div>

                        {/* Images Section */}
                        <motion.div
                            className=" bg-yellow-700 bg-opacity-40 p-10 text-white rounded-3xl shadow-2xl hover:scale-105 transform transition-all duration-500"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.4 }}
                        >
                            <h2 className="font-semibold text-lg p-2 text-black">Images</h2>
                            <div className="flex gap-4 flex-wrap">
                                {/* Map through the images array and display each image */}
                                {plantDetails?.images?.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.imageUrl} 
                                        alt={`Plant Image ${index + 1}`}  
                                        className="w-44 h-44 rounded-lg shadow-lg"
                                    />
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
