import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { assets } from "../../assets/assets";

const Login = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          mobileNumber: formData.phoneNumber,
          password: formData.password,
        }
      );
      const { token, userId, username } = response.data;

      // Store token and userId in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("name", username);

      console.log("Login successful:", response.data);
      alert("Login successful!");

      // Example: Store userId in localStorage for session management
      localStorage.setItem("userId", response.data.userId);

      // Redirect to dashboard or home
      window.location.href = "/";
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      alert(
        `Login failed: ${error.response?.data?.message || "Please try again."}`
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Form Section */}
        <div className="login-form-section">
          <h1 className="login-title">Login to Your Account</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Phone Number */}
            <div className="login-input-group">
              <label htmlFor="phone-number">Phone Number</label>
              <input
                type="tel"
                id="phone-number"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="login-input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="login-form-actions">
              <button type="submit" className="login-submit-button">
                Login
              </button>
            </div>
          </form>

          {/* Registration Redirect */}
          <p className="login-register-link">
            Don't have an account? <a href="/Registration">Register here</a>
          </p>
        </div>

        {/* Illustration Section */}
        <div className="login-section">
          <img src={assets.login_br} alt="Login img" />
        </div>
      </div>
    </div>
  );
};

export default Login;
