import React, { useEffect, useState } from "react";
import "./loginPage.scss";
import { Icon } from 'react-icons-kit'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'
import Layout from "../../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function LoginPage() {
  let navigate = useNavigate();

  // useEffect(() => {
  //   if (localStorage.getItem("authToken")) {
  //     navigate("/");
  //   }
  // }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [type,setType] = useState('password');
  const [icon,setIcon] = useState(eyeOff)

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

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);
      navigate("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-page-title">
          <h1 className="login-title">Good to see you again</h1>
          {error && <span className="error-message">{error}</span>}
        </div>
        <div className="login-page-bottom">
          <form onSubmit={loginHandler} className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
              type="email" 
              placeholder="name@example.com"
              required
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email} 
              />
            </div>

            <div className="form-group ">
              <label htmlFor="password">Password</label>
              <input
              type={type} 
              placeholder="password"
              required
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password} 
              />
              <span onClick={handleToogle} className="password-toogle-icon"><Icon size={20} icon={icon} /></span>
            </div>

            <div className="btn">
              <button className="submit-btn" type="submit">
                Sign in
              </button>
            </div>

            <div className="links">
              <div className="link">
                <Link to="/register">Don't have an account?</Link>
              </div>
              <div className="link">
                <Link to="/forgotpassword">Forgot password?</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
