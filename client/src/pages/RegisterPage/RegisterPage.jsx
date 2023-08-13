import React, { useState } from 'react'
import './registerPage.scss'
import { Icon } from 'react-icons-kit'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {

  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); 
  

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

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/register",
      {
        username,
        email,
        password,
      },
      config
      );
      // console.log(data.user._id)
      // setUserID(data.user._id);
      localStorage.setItem("authToken", data.token);
      
      navigate(`/verify?token=${data.token}&userID=${data.user._id}`);
    } catch (error) {
      // setError(error.response.data.error);
      // setTimeout(() => {
      //   setError("");
      // }, 5000);
      console.log(error);
    }

  }


  return (
    <>
    <div className="register">
      <div className="register-container">
        <div className="register-page-title">
          <h1 className="register-title">Create your account</h1>
          {error && <span className="error-message">{error}</span>}
        </div>
        <div className="register-page-bottom">
          <form onSubmit={registerHandler} className="form">
            <div className="form-group">
              <label htmlFor="username">Enter your username</label>
              <input 
              type="text" 
              placeholder="John" 
              required
              id="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            </div>

            <div className="form-group">
              <label htmlFor="email">Enter your email</label>
              <input type="email"
              required
              id="email"
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            </div>

            <div className="form-group">
              <label htmlFor="password">Enter your password</label>
              <input 
                type={type}
                placeholder="secret password"
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
                placeholder="secret password again"
                required
                id="confirmpassword"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span onClick={handleToogleConfirm} className="password-toogle-icon"><Icon size={20} icon={iconConfirm} /></span>
            </div>

            <div className="links">
              <div className="link">
                <Link to="/login">Already have an account?</Link>
              </div>
            </div>

            <div className="btn">
              <button className="submit-btn" type="submit">
                Sign up
              </button>
            </div>

           
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default RegisterPage