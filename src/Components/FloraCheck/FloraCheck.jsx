import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function FloraCheck() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null); // Store uploaded photo file
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null); // For storing API response
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Function to start the camera
  const startCamera = async () => {
    try {
      setIsLoading(true);
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

  // Function to stop the camera
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

  // Function to capture a photo
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

      stopCamera(); // Stop camera after capturing the photo
    }
  };

  // Function to handle photo upload
  const handleUploadPhoto = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreviewUrl(e.target.result);
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  // Function to send the photo to the backend
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

  // Convert base64 image string to a File object
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
      <main className="Flora py-10 mx-auto flex flex-col items-center flex-grow">
        <motion.h2
          className="homeFont text-center mt-24 text-5xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          🌱 AI-Powered FloraCheck
        </motion.h2>

        <motion.p
          className="mt-8 text-center text-xl text-white max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          “Experience the future of plant care with AI. Capture a live photo or upload an image to diagnose plant issues and receive smart, actionable insights.”
        </motion.p>

        <div className="mt-12 flex flex-col items-center">
          {/* Camera Section */}
          {!imagePreviewUrl && (
            <div className="relative text-center">
              <button
                onClick={startCamera}
                className="bg-green-800 text-white px-10 py-3 rounded-lg mb-4 text-xl hover:bg-green-600 transition duration-300"
              >
                Open Camera to Live Our Experience
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadPhoto}
                className="mt-4 text-center text-white"
              />
              {isCameraOpen && (
                <motion.div
                  className="border-dashed border-2 border-white p-8 rounded-lg shadow-lg"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.1 }}
                >
                  <video
                    ref={videoRef}
                    className="rounded-lg"
                    autoPlay
                    playsInline
                    style={{
                      aspectRatio: "4 / 3",
                      maxWidth: "600px",
                      width: "100%",
                      height: "auto",
                    }}
                  ></video>
                  <button
                    onClick={capturePhoto}
                    className="bg-green-700 mt-4 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition duration-300"
                  >
                    Capture Photo
                  </button>
                </motion.div>
              )}
            </div>
          )}

          {/* Image Preview Section */}
          {imagePreviewUrl && (
            <motion.div
              className="mt-8 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={imagePreviewUrl}
                alt="Preview"
                className="w-auto h-96 object-cover rounded-lg mb-4 shadow-lg"
              />
              <button
                onClick={sendToBackend}
                className="bg-green-900 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition duration-300"
              >
                {uploadedFile ? "Send Uploaded Photo to AI" : "Send Captured Photo to AI"}
              </button>
            </motion.div>
          )}
        </div>

        {/* Display the results */}
        {response && response.diseaseName && (
  <motion.div
    className="mt-8 text-center"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-2xl text-white font-bold">Diagnosis Results:</h3>
    <p className="text-white text-lg mt-2">
      Disease Name: {response.diseaseName}
    </p>
    <div className="bg-white text-black text-lg mt-4 p-4 rounded-lg shadow-md">
      <p className="font-semibold">Chatbot Reply:</p>
      <p>{response.chatbotReply}</p>
    </div>
    {response.Image && response.ImageType && (
      <img
        src={`data:${response.ImageType};base64,${response.Image}`}
        alt="Processed Image"
        className="w-auto h-96 object-cover rounded-lg mt-4 shadow-lg"
      />
    )}
  </motion.div>
)}

       
      </main>
    </>
  );
}
