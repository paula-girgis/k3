import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function NewPassword() {
  const location = useLocation();

  // Extract token and email from the URL query parameters
  const token = new URLSearchParams(location.search).get("token");
  const email = new URLSearchParams(location.search).get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token || !email) {
      setError("Missing token or email.");
    }
  }, [token, email]);

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Check if the new password matches the confirm password
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "/api/User/reset-password",
        { newPassword, confirmPassword },
        { params: { token, email } }
      );
      setSuccess(response.data.message);
      setIsLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="regiserBack flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-transparent shadow-2xl rounded-xl w-full max-w-5xl p-8">
        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg"
            role="alert"
          >
            {error}
          </div>
        )}
        {success && (
          <div
            className="p-4 mb-4 text-sm text-green-800 bg-green-100 border border-green-200 rounded-lg"
            role="alert"
          >
            {success}
          </div>
        )}
        {!success && (
          <>
            <h2 className="p-6 Color text-lg font-bold mb-6 shadow-sm text-center">
              Reset Your Password
            </h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="newPassword"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  New Password
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="confirmPassword"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Confirm Password
                </label>
              </div>
              <button
                type="submit"
                className="btn bg-main mt-4 d-block mx-auto bttn w-full text-center text-white hover:bg-green-800 transition"
              >
                {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Reset Password"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
