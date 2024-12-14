import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function EmailConfirmation() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Loading...");
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    // Validate that token and email exist
    if (!token || !email) {
      setMessage("Invalid or missing token/email.");
      return;
    }

    // API Call
    const fetchConfirmation = async () => {
      try {
        const response = await axios.get("/api/User/emailConfirmation", {
        params: { token, email }
        });

        const data = await response.json();

        if (response.ok && response?.data?.message === "Email verified successfully") {
          setMessage("Your email is verified successfully.");
        } else {
          setMessage(response?.data?.message);
        }
      } catch (error) {
        setMessage("Failed to connect to the server.");
      }
    };

    fetchConfirmation();
  }, [searchParams]);

  return (
    <>
      <div className="regiserBack h-screen flex flex-col">
        {/* Top Title */}
        <h2 className="Color font-bold text-2xl mt-24 text-center">
          Email Confirmation
        </h2>

        {/* Centered Message */}
        <div className="flex flex-grow justify-center items-center">
          <div className="py-10 px-6 mx-auto shadow-2xl bg-transparent rounded-xl w-full max-w-5xl text-center">
            <h2 className="p-6 Color text-lg font-bold mb-6 shadow-sm">{message}</h2>
            {message === "Your email is verified successfully." && (
              <p className="text-center text-gray-700">
                You can now <span onClick={() => navigate("/login")} className="text-green-600 hover:underline cursor-pointer">login</span> to your account.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
