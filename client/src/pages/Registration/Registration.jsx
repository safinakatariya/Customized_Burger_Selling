import React, { useState } from "react";
import axios from "axios";
import "./Registration.css";
import { assets } from "../../assets/assets";

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
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
      const response = await axios.post("http://localhost:5000/api/user", {
        username: formData.fullName,
        mobileNumber: formData.phoneNumber,
        password: formData.password,
      });

      console.log("Registration Successful:", response.data);
      alert("Registration successful! Please login.");
    } catch (error) {
      console.error(
        "Error during registration:",
        error.response?.data?.message || error.message
      );
      alert(
        `Registration failed: ${
          error.response?.data?.message || "Please try again."
        }`
      );
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <div className="registration-form-section">
          <h1 className="registration-title">Create an Account</h1>
          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="registration-input-group">
              <label htmlFor="full-name">Full Name</label>
              <input
                type="text"
                id="full-name"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="registration-input-group">
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

            <div className="registration-input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="registration-form-actions">
              <button type="submit" className="registration-submit-button">
                Register
              </button>
            </div>
          </form>

          {/* Login Redirect */}
          <p className="registration-login-link">
            Already have an account? <a href="/Login">Login here</a>
          </p>
        </div>

        {/* Illustration Section */}
        <div className="registration-section">
          <img src={assets.login_br} alt="Registration img" />
        </div>
      </div>
    </div>
  );
};

export default Registration;
