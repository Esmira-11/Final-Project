import React from 'react'
import './forgotPassword.scss'
import { useNavigate } from 'react-router-dom'


function forgotPassword() {
  let navigate = useNavigate();

  const handleClick =()=>{
    navigate('/changepassword')
  }

  return (
    <div className="forgot-password">
      <div className="forgot-password-container">
        <div className="forgot-password-page-title">
          <h1 className="forgot-password-title">Forgot your password?</h1>
        </div>
        <div className="forgot-password-page-content">
          <p>Please enter the email address you register your account with. We will send you reset password confirmation to this email.</p>
        </div>
        <div className="forgot-password-page-bottom">
          <div className="form">
            <div className="form-group">
              {/* <label htmlFor="email">Email</label> */}
              <input type="email" placeholder="name@example.com" />
            </div>

            <div className="links">
              <div className="link">
                <a href="/login">Back to Sign in</a>
              </div>
            </div>

            <div className="btn">
              <button className="submit-btn" type="submit" onClick={handleClick}>
                Continue
              </button>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  )
}

export default forgotPassword