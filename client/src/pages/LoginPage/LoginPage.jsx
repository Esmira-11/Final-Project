import React, { useState } from "react";
import "./loginPage.scss";
// import usePasswordToogle from "./usePasswordToogle";
import { Icon } from 'react-icons-kit'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'



function LoginPage() {

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

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-page-title">
          <h1 className="login-title">Good to see you again</h1>
        </div>
        <div className="login-page-bottom">
          <div className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="name@example.com" />
            </div>

            <div className="form-group ">
              <label htmlFor="password">Password</label>
              <input type={type} placeholder="password" />
              <span onClick={handleToogle} className="password-toogle-icon"><Icon size={20} icon={icon} /></span>
            </div>

            <div className="btn">
              <button className="submit-btn" type="submit">
                Sign in
              </button>
            </div>

            <div className="links">
              <div className="link">
                <a href="/register">Don't have an account?</a>
              </div>
              <div className="link">
                <a href="/forgotpassword">Forgot password?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
