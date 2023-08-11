import React from 'react'
import './verify.scss'
function Verify() {
  return (
    <>
    <div className="verify">
      <div className="verify-container">
        <div className="verify-page-title">
          <h1 className="verify-title">Verify your email!</h1>
        </div>
        <div className="verify-page-content">
            <p>Please enter the 4-digit verification code that was sent to your email. The code is valid for 1 minutes.</p>
        </div>
        <div className="verify-page-bottom">
          <div className="form">
            <div className="form-group">
              {/* <label htmlFor="code">Verification code</label> */}
              <input type="text" placeholder='Verification code'/>
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

           
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Verify