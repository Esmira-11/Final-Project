import React, { useState } from 'react'
import { Icon } from 'react-icons-kit'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'
import './changePassword.scss'
import { Link, useParams,useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ChangePassword() {

  let navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [type,setType] = useState('password');
  const [icon,setIcon] = useState(eyeOff)

  const [typeConfirm,setTypeConfirm] = useState('password');
  const [iconConfirm,setIconConfirm] = useState(eyeOff)

  const handleToogle = () =>{
    if(type === 'password'){
      setIcon(eye);
      setType('text');
    }
    else{
      setIcon(eyeOff);
      setType('password')
    }
  }

  const handleToogleConfirm = () =>{
    if(typeConfirm === 'password'){
      setIconConfirm(eye);
      setTypeConfirm('text');
    }
    else{
      setIconConfirm(eyeOff);
      setTypeConfirm('password')
    }
  }

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/auth/resetpassword/${token}`,
        {
          password,
        },
        config
      );

      console.log(data);
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="change-password">
      <div className="change-password-container">
        <div className="change-password-page-title">
          <h1 className="change-password-title">Reset Password</h1>
          {error && <span className="error-message">{error} </span>}
          {success && (<span className="success-message">{success} <Link to="/login">Login</Link></span>
        )}
        </div>
        <div className="change-password-page-bottom">
          <form onSubmit={resetPasswordHandler} className="form">
            
            <div className="form-group">
              <label htmlFor="password">Enter your password</label>
              <input
               type={type} 
               placeholder="new password"
               required
               id="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)} 
               />
              <span onClick={handleToogle} className="password-toogle-icon"><Icon size={20} icon={icon} /></span>
            </div>

            <div className="form-group">
              <label htmlFor="password">Confirm your password</label>
              <input 
              type={typeConfirm} 
              placeholder="new password again"
              required
              id="confirmpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} 
              />
              <span onClick={handleToogleConfirm} className="password-toogle-icon"><Icon size={20} icon={iconConfirm} /></span>
            </div>

            <div className="btn">
              <button className="submit-btn" type="submit">
                Reset Password
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword