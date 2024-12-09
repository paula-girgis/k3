

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";


function EnviroAnalysis() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  const generateRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const generateMetrics = () => {
    return [
      {
        title: "Temperature",
        value: `${generateRandomValue(15, 35)}°C`,
        ideal: "20-30°C",
        color: "bg-red-200",
        status: "Temperature is slightly off the ideal range.",
      },
      {
        title: "Humidity",
        value: `${generateRandomValue(10, 90)}%`,
        ideal: "20%",
        color: "bg-purple-200",
        status: "Humidity is within the acceptable range.",
      },
      {
        title: "Soil Moisture",
        value: `${generateRandomValue(10, 50)}%`,
        ideal: "20%",
        color: "bg-blue-200",
        status: "Soil moisture level needs attention.",
      },
      {
        title: "Light Intensity",
        value: `${generateRandomValue(400, 800)} Lux`,
        ideal: "500-700 Lux",
        color: "bg-yellow-200",
        status: "Light intensity is optimal.",
      },
    ];
  };

  useEffect(() => {
   
    setLoading(true);
    const timeout = setTimeout(() => {
      setMetrics(generateMetrics());
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout); 
  }, []);

  return (
    <div className="p-4 regiserBack">
      {/* Title */}
      <div className="text-center mb-6 container mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font font-bold Color text-center pt-10 mt-14"
        >
          "Analyze Your Plant's Environment"
        </motion.h1>
        <p className="text-gray-800 mt-5 ">
          Track and optimize your plant's environment for healthy growth.
        </p>
      </div>


      {/* Loading Indicator */}
      {loading ? (
      <div className="flex flex-col items-center justify-center my-16 ">
      <ClipLoader color="#22c55e" size={60} />
     <p className="mt-4 text-lg font-medium text-gray-900  md:text-base text-center max-w-md md:max-w-lg  animate-bounce">
            Loading your plant data...
      </p>
  </div>

      ) : (
        <>
          {/* Environmental Metrics */}
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-16 ">
            {metrics.map((metric, index) => (
              <div key={index} className={` rounded-full p-10 text-center shadow ${metric.color}`}>
                <h3 className="font-bold">{metric.title}</h3>
                <p className="text-2xl">{metric.value}</p>
                <p className="text-sm text-gray-600">Ideal: {metric.ideal}</p>
                <p className="text-xs mt-2 text-gray-700">{metric.status}</p>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="container my-16 mx-auto">
            <h2 className="text-xl font-bold mb-2">Plant-Specific Recommendations</h2>
            <ul className="list-disc list-inside">
              {metrics.map((metric, index) => (
                <li key={index}>
                  {`${metric.title}: ${metric.status}`}
                </li>
              ))}
            </ul>
          </div>

          {/* Soil Moisture Warning */}
          <div className="container mx-auto mb-20 bg-white rounded-xl p-6 shadow-xl">
            <h3 className="font-bold text-lg">
              {metrics[2].value.includes("15%")
                ? "Soil moisture is critically low — water your plant immediately!"
                : "Soil moisture level is acceptable."}
            </h3>
            <p className="text-sm text-gray-600">
              Soil moisture is monitored regularly to ensure healthy growth.
            </p>
            <div className="mt-4 flex space-x-2">
              <button className="bg-green-500 text-white px-4 py-2 rounded">Good</button>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded">Attention</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded">Critical</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default EnviroAnalysis;