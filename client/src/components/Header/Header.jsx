import React from "react";
import "./header.scss";
import bowl from "../../assets/images/pet-bowl-3.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useCart } from "../../context/CartContext";

import Badge from "@mui/material/Badge";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [values, setValues] = useSearch();
  const { cart, addToCart, removeFromCart } = useCart();

  let navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("authToken");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

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
            {/* {console.log(JSON.stringify(auth, null, 4))} */}
            <form onSubmit={handleSubmit}>
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={values.keyword}
                  onChange={(e) =>
                    setValues({ ...values, keyword: e.target.value })
                  }
                />
                <a href="#" onClick={handleSubmit}>
                  <i className="fas fa-search "></i>
                </a>
              </div>
            </form>

            <div className="profile-icon icon">
              <Link
                to={`/profile/${auth?.user?.role === 1 ? "admin" : "user"}`}
              >
                <i className="fa-regular fa-user"></i>
              </Link>
            </div>

            <div className="profile-icon icon">
              <a onClick={handleLogout} href="#">
                <i className="fa-solid fa-right-from-bracket"></i>
              </a>
            </div>

            <div className="cart-icon icon">
              <NavLink to="/card" className="navlink">
                {/* <Badge badgeContent={card?.reduce((total, item) => total + item.quantity, 0)} color="primary"> */}
                <img src={bowl} alt="dog-bowl" />
                {/* </Badge> */}
                {/* cart?.reduce((total, item) => total + item.quantity, 0) */}
                <span>{cart?.length}</span>
              </NavLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
