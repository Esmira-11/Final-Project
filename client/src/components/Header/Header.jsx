import React from 'react'
import './header.scss'
import bowl from '../../assets/images/pet-bowl-3.png'

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <div className="logo-icon">
          <i class="fa-solid fa-paw"></i>
        </div>
        <div className="logo-name">
          <h2>Possy Sunny</h2>
        </div>
      </div>

      <div className="nav">
        <div className="nav-links">
          <div className="nav-link">
            <a href="#">About us</a>
          </div>
          <div className="nav-link">
            <a href="#">Shop</a>
          </div>
          <div className="nav-link">
            <a href="#">Services</a>
          </div>
          <div className="nav-link">
            <a href="#">Announcement</a>
          </div>
          {/* <div className="nav-link">
            <a href="#">About</a>
          </div> */}
        </div>
      </div>

      <div className="icons">
          <div className="search-icon icon">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          
          <div className="profile-icon icon">
            <i class="fa-regular fa-user"></i>
          </div>
          
          <div className="cart-icon icon">
            <img src={bowl} alt="dog-bowl" />
          </div>
        </div>
    </div>
  )
}

export default Header