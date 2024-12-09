
import React, { useState } from "react";
import Footer from "../Footer/Footer";
import { motion } from 'framer-motion';


export default function Chatbot() {
  const [query, setQuery] = useState(""); // السؤال
  const [response, setResponse] = useState(""); // الرد من الـ API
  const [loading, setLoading] = useState(false); // حالة التحميل

  // استدعاء الـ API
  async function askChatbot(question) {
    const apiUrl = "/api/Chatbot/chat"; // رابط الخادم الصحيح

    const requestBody = {
      question: question,
    };

    try {
      setLoading(true);
      setResponse("");

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        setResponse(data); // Now we store the entire response object (userQuestion and Reply)
      } else {
        setResponse("Unable to fetch response from the server.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse("Failed to connect to the backend. Please try again.");
    } finally {
      setLoading(false); // انتهاء التحميل
    }
  }

  const handleSearch = () => {
    if (!query.trim()) {
      alert("Please enter a question.");
      return;
    }
    askChatbot(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <main className="regiserBack min-h-screen pt-28 pb-24 flex flex-col items-center justify-center bg-green-900 text-white">
      <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="text-4xl md:text-8xl font font-bold Color text-center p-10">ChatBot </motion.h1>
          <div className="w-full max-w-4xl mb-6">
          <div className="flex items-center border-2 border-green-700 rounded-full px-8 py-3 bg-transparent">
            <input
              type="text"
              placeholder="Ask me about your plants..."
              className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown} 
            />
            <button
              onClick={handleSearch}
              className="ml-4 text-green-800 hover:text-green-600"
            >
              <i class="fa-solid fa-arrow-right font-bold text-2xl"></i>
            </button>
          </div>
        </div>

        <p className="mt-2 text-sm md:text-base text-center max-w-md md:max-w-lg text-gray-600 bg-gradient-to-r from-green-400 via-gray-700 to-green-900 text-transparent bg-clip-text font-semibold tracking-wide animate-bounce">
  An AI-powered tool designed to assist users with information and guidance related to caring for their plants.
</p>
 

        {/* عرض الرد */}
        <div className="mt-14 mb-14 w-full max-w-md md:max-w-4xl">
      {loading ? (
      <div className="w-full mx-auto h-full flex flex-col items-center justify-center p-11 bg-gray-600 rounded-full">
      <div className="relative flex items-center justify-center">
        <div className="absolute text-white text-2xl font-bold animate-pulse scale-150">
          <i className="fa-solid fa-seedling"></i>
        </div>
      </div>

      <span className="homeFont text-white mt-8 text-5xl font-extrabold tracking-wider animate-pulse">
        Generating Answer...
      </span>
    </div>
  ) : response ? (
    <>
      {/* السؤال */}
      <div className="flex justify-end mb-6">
        <div className="relative bg-green-800 backdrop-blur-md px-6 py-4 max-w-[80%] border border-white/20 rounded-3xl shadow-xl transform transition-all duration-300 hover:scale-105">
          <div className="absolute -bottom-3 right-5 w-4 h-4 bg-green-800 transform rotate-45 border border-white/20"></div>
          <p className="font-medium text-white">Question: {response.userQuestion}</p>
        </div>
      </div>

      {/* الإجابة */}
      <div className="flex justify-start items-center space-x-4 mb-4">
        <div className="relative bg-gray-800 backdrop-blur-md px-6 py-4 max-w-[80%] border border-green-500/30 rounded-3xl shadow-xl transform transition-all duration-300 hover:scale-105">
          <div className="absolute -bottom-3 left-5 w-4 h-4 bg-gray-800 transform rotate-45 border border-green-500/30"></div>
          <p className="text-white">{response.reply}</p>
        </div>
      </div>
    </>
  ) : (
    <p></p>
          )}</div>


      </main>
      <Footer />
    </>
  );
}

