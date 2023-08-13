import React, { useState } from 'react'
import './verify.scss'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function Verify() {
  let navigate = useNavigate();

  const [otp, setOtp] = useState('');
  const {token, userID } = useParams();
  const [error, setError] = useState("");

  const handleVerify = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/verify`, {
        otp,
        userID,
      });
      if (response.data.success) {
        console.log("true")
        navigate('/login'); 
      } else {
        setError(error.response.data.error);
        setTimeout(() => {
        setError("");
        }, 5000);
        console.log('OTP verification failed');
      }
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  return (
    <>
    <div className="verify">
      <div className="verify-container">
        <div className="verify-page-title">
          <h1 className="verify-title">Verify your email!</h1>
          {error && <span className="error-message">{error}</span>}
        </div>
        <div className="verify-page-content">
            <p>Please enter the 4-digit verification code that was sent to your email. The code is valid for 1 minutes.</p>
        </div>
        <div className="verify-page-bottom">
          <form className="form" onSubmit={handleVerify}>
            <div className="form-group">
              {/* <label htmlFor="code">Verification code</label> */}
              <input 
              type="text" 
              placeholder='Verification code'
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            {/* <div className="links">
              <div className="link">
                <a href="/login">Already have an account?</a>
              </div>
            </div> */}

            <div className="btn">
              <button className="submit-btn" type="submit">
                Continue
              </button>
            </div>

           
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Verify