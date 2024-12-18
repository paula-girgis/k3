

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function FloraCheck() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    setIsLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraOpen(true);
    } catch (err) {
      console.error("Error accessing the camera: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && videoRef.current.readyState === 4) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const video = videoRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL("image/png");
      setImagePreviewUrl(dataUrl);

      stopCamera();
    }
  };

  const handleUploadPhoto = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreviewUrl(e.target.result);
      reader.readAsDataURL(file);
      setIsCameraOpen(false);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const sendToBackend = async () => {
    setIsLoading(true);
    const formData = new FormData();

    if (uploadedFile) {
      formData.append("file", uploadedFile);
    } else {
      formData.append("file", dataUrlToFile(imagePreviewUrl, "plant_image.png"));
    }

    try {
      const response = await fetch("/api/FloraCheck/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to send the image to the server.");
      }

      const result = await response.json();
      setResponse(result);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the image.");
    } finally {
      setIsLoading(false);
    }
  };

  const dataUrlToFile = (dataUrl, filename) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) u8arr[n] = bstr.charCodeAt(n);

    return new File([u8arr], filename, { type: mime });
  };

  return (
    <>
      {/* Full-Screen Spinner with Falling Leaves */}
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Falling Leaves */}
          {[...Array(25)].map((_, i) => (
            <motion.img
              key={i}
              src={leaf} // Replace with a leaf image URL
              alt="Leaf"
              className="absolute"
              style={{
                width: `${Math.random() * 50 + 20}px`, // Random size for the leaves
                height: "auto",
                top: `${Math.random() * -100}%`, // Start from random positions above the screen
                left: `${Math.random() * 100}%`, // Random horizontal positions
              }}
              initial={{ y: 0, rotate: Math.random() * 360 }}
              animate={{ y: "120vh", rotate: 360 }}
              transition={{
                duration: Math.random() * 4 + 2, // Random falling speed
                repeat: Infinity,
                delay: Math.random(), // Random delay for each leaf
              }}
            />
          ))}
        </motion.div>
      )}

      <main className="regiserBack py-16 mx-auto flex flex-col items-center flex-grow">
        <motion.h2 
          className="homeFont text-center mt-14 mb-10 text-6xl font-extrabold text-green-950"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
             AI-Powered FloraCheck
        </motion.h2>

        <div className="mt-8 flex flex-col items-center space-y-6 w-full">
          <div className="relative border-dashed border-4 border-green-500 rounded-xl shadow-lg p-6 w-3/4 flex items-center justify-center min-h-[300px]">
            {isCameraOpen ? (
              <>
                <video
                  ref={videoRef}
                  className="rounded-lg"
                  autoPlay
                  playsInline
                  style={{ aspectRatio: "4 / 3", maxWidth: "100%", height: "auto" }}
                ></video>
                <button onClick={capturePhoto} className="absolute bottom-4 bg-green-800 text-white px-6 py-2 rounded-full text-sm shadow-md hover:bg-green-600 hover:scale-105 transition duration-300">
                  Capture Photo
                </button>
              </>
            ) : imagePreviewUrl ? (
              <img
                src={imagePreviewUrl}
                alt="Preview"
                className="w-auto h-full max-h-[300px] object-contain rounded-lg"
              />) : (
              <p className="text-green-900">No image or camera feed yet. Start by selecting an option below.</p>)}

            {(isCameraOpen || imagePreviewUrl) && (
              <button
                onClick={stopCamera}
                className="absolute top-4 right-4 bg-red-800 text-white px-4 py-3 rounded-full text-sm shadow-md hover:bg-red-600 transition duration-300"
              >
                X
              </button>
            )}
          </div>

          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={startCamera}
              className="bg-green-800 text-white mt-10 px-14 py-3 rounded-full text-lg shadow-md hover:bg-green-600 hover:scale-105 transition duration-300"
            >
              Open Camera
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadPhoto}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-green-800 text-white px-8 py-3 rounded-full text-lg shadow-md hover:bg-green-600 hover:scale-105 transition duration-300 flex items-center justify-center cursor-pointer"
            >
              Upload Photo
            </label>
          </div>

          {imagePreviewUrl && (
            <button
              onClick={sendToBackend}
              className="mt-6 bg-green-800 text-white px-8 py-3 rounded-full text-lg shadow-md hover:bg-green-600 hover:scale-105 transition duration-300"
            >
              {isLoading ? "Processing..." : "Send to AI to live the experience"}
            </button>
          )}

          {response && (
            <motion.div
              className="mt-12 bg-white p-8 text-center rounded-xl shadow-lg max-w-3xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-3xl font-bold text-green-800 p-6">Diagnosis Results</h3>
              <motion.p
                className="text-xl text-gray-800 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-green-800 font-extrabold p-5">Disease :</span>  {response.diseaseName}
              </motion.p>
              <motion.div
                className="bg-gray-100 p-8 rounded-lg shadow-2xl mt-6"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-green-700 font-medium text-lg">{response.chatbotReply}</p>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
}
