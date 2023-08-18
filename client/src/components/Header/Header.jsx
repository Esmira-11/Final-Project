import React from "react";
import "./header.scss";
import bowl from "../../assets/images/pet-bowl-3.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Header = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user:null,
      token: ''
    })
    localStorage.removeItem('auth')
    localStorage.removeItem('authToken')

  }

  return (
    <div className="header">
      <div className="logo">
        <div className="logo-icon">
          <i className="fa-solid fa-paw"></i>
        </div>
        <div className="logo-name">
          <h2>Possy Sunny</h2>
        </div>
      </div>

      <div className="nav">
        <div className="nav-links">
          <div className="nav-link">
            <a href="/">Home</a>
          </div>
          <div className="nav-link">
            <a href="about">About us</a>
          </div>
          <div className="nav-link">
            <a href="shop">Shop</a>
          </div>
          <div className="nav-link">
            <a href="announsements">Announcement</a>
          </div>
          <div className="nav-link">
            <a href="contact">Contact</a>
          </div>
        </div>
      </div>

      {!auth.user ? (
        <>
          <div className="icons">
            <div className="profile-icon icon">
              <a href="/login">Login</a>
            </div>
            <div className="profile-icon icon">
              <a href="/register">Register</a>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="icons">
            {/* <h2>{JSON.stringify(auth,null,4)}</h2> */}
            {console.log(JSON.stringify(auth, null, 4))}
            <div className="search-icon icon">
              <a href="">
                <i className="fa-solid fa-magnifying-glass"></i>
              </a>
            </div>

            <div className="profile-icon icon">
              <Link to={`/profile/${
                auth?.user?.role === 1 ? 'admin' : 'user' 
                }`}>
                <i className="fa-regular fa-user"></i>
              </Link>
            </div>

            <div className="profile-icon icon">
              <a onClick={handleLogout} href="#">
                <i className="fa-solid fa-right-from-bracket"></i>
              </a>
            </div>

            <div className="cart-icon icon">
              <img src={bowl} alt="dog-bowl" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
