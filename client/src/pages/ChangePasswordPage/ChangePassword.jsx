import React, { useState } from 'react'
import { Icon } from 'react-icons-kit'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'
import './changePassword.scss'

function ChangePassword() {

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

  return (
    <div className="change-password">
      <div className="change-password-container">
        <div className="change-password-page-title">
          <h1 className="change-password-title">Reset Password</h1>
        </div>
        <div className="change-password-page-bottom">
          <div className="form">
            

            <div className="form-group">
              <label htmlFor="password">Enter your password</label>
              <input type={type} placeholder="secret password" />
              <span onClick={handleToogle} className="password-toogle-icon"><Icon size={20} icon={icon} /></span>
            </div>

            <div className="form-group">
              <label htmlFor="password">Confirm your password</label>
              <input type={typeConfirm} placeholder="secret password again" />
              <span onClick={handleToogleConfirm} className="password-toogle-icon"><Icon size={20} icon={iconConfirm} /></span>
            </div>

            <div className="btn">
              <button className="submit-btn" type="submit">
                Reset Password
              </button>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword