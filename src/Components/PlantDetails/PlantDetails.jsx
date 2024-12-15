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
            <div className="registerBack">
                <div className="mx-auto container row py-28">
                    <h1 className="text-xl mt-10 font-semibold text-green-900 p-5">
                        {plantDetails?.diseaseName || "Unknown Disease"}
                    </h1>
                    <img
                        className="w-full rounded-xl shadow-2xl h-96 m-5 mb-16"
                        src={plantDetails?.images?.[0]?.imageUrl || "https://via.placeholder.com/150"}
                        alt={plantDetails?.diseaseName || "Unknown Disease"}
                    />
<div className="w-2/4">
    {/* Cause and Treatment Combined Section */}
    <div className="bg-white p-6 rounded-xl shadow-xl">
        <h2 className="text-xl font-semibold text-green-700">Cause</h2>
        <div className="text-gray-700 mt-2">
            {plantDetails?.cause ? (
                (() => {
                    const cause = plantDetails.cause;

                    // Split the cause into "Cause" and "Treatment" parts
                    const treatmentIndex = cause.indexOf("Treatment");
                    const extractedCause = treatmentIndex >= 0 ? cause.substring(0, treatmentIndex).trim() : cause;
                    const extractedTreatment = treatmentIndex >= 0 ? cause.substring(treatmentIndex).trim() : null;

                    return (
                        <>
                            {/* Display Cause */}
                            <div>
                                <h3 className="text-lg font-bold mt-4">Cause</h3>
                                <ul className="list-disc list-inside ml-4">
                                    <li><strong>Fungus:</strong> Gymnosporangium juniperi-virginianae alternates between apple and cedar/juniper trees.</li>
                                    <li><strong>Weather:</strong> Thrives in warm, wet spring conditions.</li>
                                    <li><strong>Transmission:</strong> Windborne spores from cedar galls infect apple trees.</li>
                                </ul>
                            </div>

                            {/* Display Treatment if exists */}
                            {extractedTreatment && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-bold mt-4">Treatment</h3>
                                    <ul className="list-disc list-inside ml-4">
                                        <li><strong>Cultural Practices:</strong>
                                            <ul className="list-disc list-inside ml-6">
                                                <li>Avoid planting apple trees near cedars/junipers.</li>
                                                <li>Prune and destroy infected branches or galls in winter.</li>
                                                <li>Clear debris around apple trees.</li>
                                            </ul>
                                        </li>
                                        <li><strong>Chemical Controls:</strong>
                                            <ul className="list-disc list-inside ml-6">
                                                <li>Apply fungicides (e.g., myclobutanil, propiconazole) during the pink-bud stage and wet weather.</li>
                                            </ul>
                                        </li>
                                        <li><strong>Biological Controls:</strong>
                                            <ul className="list-disc list-inside ml-6">
                                                <li>Plant rust-resistant apple varieties (e.g., ‘Liberty,’ ‘Enterprise’).</li>
                                            </ul>
                                        </li>
                                        <li><strong>Environmental Management:</strong>
                                            <ul className="list-disc list-inside ml-6">
                                                <li>Ensure good airflow and sunlight with proper pruning.</li>
                                                <li>Provide adequate water and nutrients to reduce stress.</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </>
                    );
                })()
            ) : (
                <p>Cause not available</p>
            )}
        </div>
    </div>
</div>




                    <div className="w-2/4 p-16">
                        {/* Symptoms Section */}
                        <motion.div
                            className="mb-4 p-6 bg-green-700 text-white rounded-xl shadow-xl hover:scale-105 transform transition-all duration-300"
                            animate={{ x: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        >
                            <h2 className="font-semibold text-xl mb-2">Symptoms</h2>
                            <div
                                className="text-white leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: plantDetails?.symptoms || "<p>Symptoms not available</p>",
                                }}
                            ></div>
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
