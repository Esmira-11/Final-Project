import React, { useState } from 'react'
import './forgotPassword.scss'
import {Link, useNavigate } from 'react-router-dom'
import axios from "axios";


function ForgotPassword() {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "https://mern-project-server-oonq.onrender.com/api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="forgot-password">
      <div className="forgot-password-container">
        <div className="forgot-password-page-title">
          <h1 className="forgot-password-title">Forgot your password?</h1>
          {error && <span className="error-message">{error}</span>}
          {success && <span className="success-message">{success}</span>}
        </div>
        <div className="forgot-password-page-content">
          <p>Please enter the email address you register your account with. We will send you reset password confirmation to this email.</p>
        </div>
        <div className="forgot-password-page-bottom">
          <form onSubmit={forgotPasswordHandler} className="form">
            <div className="form-group">
              {/* <label htmlFor="email">Email</label> */}
              <input 
              type="email" 
              placeholder="name@example.com"
              required
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="links">
              <div className="link">
                <Link to="/login">Back to Sign in</Link>
              </div>
            </div>

            <div className="btn">
              <button className="submit-btn" type="submit">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword