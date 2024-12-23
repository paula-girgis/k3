import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function FloraCheck() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [scrollDirection, setScrollDirection] = useState("down");

  const scrollToSection = () => {
    if (scrollDirection === "down") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      setScrollDirection("up");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setScrollDirection("down");
    }
  };

  const startCamera = async () => {
    setIsLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream; // Assign the stream to the video element
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play(); // Ensure the video starts playing
        };
      }

      setIsCameraOpen(true);
      setErrorMessage(null);
    } catch (err) {
      console.error("Error accessing the camera: ", err);
      setErrorMessage("Could not access the camera. Please check your device or browser settings.");
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
    } else {
      console.error("Camera feed is not ready.");
      setErrorMessage("Camera feed is not ready. Please try again.");
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
        const errorData = await response.json();
        const errorDetails = errorData.details || "An unexpected error occurred.";
        setErrorMessage(errorDetails);
        throw new Error(errorDetails);
      }

      const result = await response.json();
      setResponse(result);
      setErrorMessage(null);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetProcess = () => {
    setResponse(null);
    setImagePreviewUrl(null);
    setUploadedFile(null);
    setIsCameraOpen(false);
    setErrorMessage(null);
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

  const stripHtml = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    let textContent = doc.body.textContent || "";

    textContent = textContent.replace(/Symptoms?:[^.]\./g, "").replace(/<[^>]>/g, "").trim();

    return textContent;
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="loader border-t-4 border-green-500 w-16 h-16 rounded-full animate-spin"></div>
        </div>
      )}

      <main className="regiserBack py-16 mx-auto flex flex-col items-center flex-grow">
        <motion.h2
          className="homeFont text-center mt-14 mb-10 text-6xl font-extrabold text-green-950"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          AI-Powered FloraCheck
        </motion.h2>

        <motion.p
          className="text-center container  p-4 text-lg font-medium text-green-800"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          Discover plant health like never before! Upload or capture a plant image, and let our AI detect diseases,
          symptoms, and solutions instantly.
        </motion.p>

        <div className="mt-8 flex flex-col items-center space-y-6 w-full">
          {response ? (
            <motion.div
              className="relative border-dashed border-4 border-green-500 rounded-xl shadow-lg p-6 w-3/4 flex flex-col items-center space-y-6 min-h-[300px] bg-gray-900 text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl">
                <span className="text-green-400 font-extrabold">Disease:</span> {response.diseaseName}
              </p>
              <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                <p className="text-green-400">{stripHtml(response.chatbotReply)}</p>
              </div>
              <button
                onClick={resetProcess}
                className="mt-4 bg-green-800 text-white px-8 py-3 rounded-full text-lg shadow-md hover:bg-green-600 hover:scale-105 transition duration-300"
              >
                Start Again
              </button>
            </motion.div>
          ) : (
            <>
              {errorMessage && (
                <div className="text-red-500 bg-red-100 p-4 rounded-lg">
                  <p>Error: {errorMessage}</p>
                </div>
              )}

              <div className="relative border-dashed border-4 border-green-500 rounded-xl shadow-lg p-6 w-3/4 flex items-center justify-center min-h-[300px]">
                {isCameraOpen && (
                  <video
                    ref={videoRef}
                    className="w-auto max-h-[300px] rounded-lg"
                    autoPlay
                    playsInline
                  ></video>
                )}
                {!isCameraOpen && imagePreviewUrl && (
                  <img
                    src={imagePreviewUrl}
                    alt="Preview"
                    className="w-auto h-full max-h-[300px] object-contain rounded-lg"
                  />
                )}
                {!isCameraOpen && !imagePreviewUrl && (
                  <p className="text-green-900">No image or camera feed yet. Start by selecting an option below.</p>
                )}
              </div>

              <div className="flex flex-col items-center space-y-4">
                <button
                  onClick={startCamera}
                  className="bg-green-800 text-white mt-10 px-14 py-3 rounded-full text-lg shadow-md hover:bg-green-600 hover:scale-105 transition duration-300"
                >
                  Open Camera
                </button>

                {isCameraOpen && (
                  <button
                    onClick={capturePhoto}
                    className="bg-green-800 text-white mt-10 px-14 py-3 rounded-full text-lg shadow-md hover:bg-green-600 hover:scale-105 transition duration-300"
                  >
                    Capture Photo
                  </button>
                )}

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
                <motion.button
                  onClick={sendToBackend}
                  className="bg-green-800 text-white mt-10 px-14 py-3 rounded-full text-lg shadow-md hover:bg-green-600 hover:scale-105 transition duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  Check Disease
                </motion.button>
              )}
            </>
          )}
        </div>
      </main>

      <motion.button
        onClick={scrollToSection}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-green-900 via-green-600 to-green-700 text-white p-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {scrollDirection === "down" ? <span className="text-2xl">↓</span> : <span className="text-2xl">↑</span>}
      </motion.button>
    </>
  );
}
