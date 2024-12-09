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

  useEffect(() => {
    // If token or email is missing, display an error
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
      setError("Passwords do not match");
      return;
    }

    try {
      // Send POST request with the new password and confirm password in the body
      const response = await axios.post(
        "/api/User/reset-password",
        {
          newPassword,  // Include the new password in the request body
          confirmPassword,  // Include the confirm password in the request body
        },
        {
          params: { token, email },  // Pass token and email as query paraameters
        }
      );
      // Display success message if the password reset is successful
      setSuccess(response.data.message);
    } catch (err) {
      // Handle any errors that occur
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="new-password-container">
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      {!success && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
}