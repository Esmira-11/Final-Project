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
    navigate("/")
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
    <>
   


    <nav>
      <input type="checkbox" id="check" />
      <label htmlFor="check">
        <i className="fa-solid fa-bars" id="btn"></i>
        <i className="fa-solid fa-xmark" id="cancel"></i>
      </label>
      <div className="logo">
        <div className="logo-icon">
          <i className="fa-solid fa-paw"></i>
        </div>
        <div className="logo-name">
          <h2>Possy Sunny</h2>
        </div>
      </div>
      <ul>
        <li className="special"><a href="/">Home</a></li>
        <li className="special"><a href="/about">About us</a></li>
        <li className="special"><a href="/shop">Shop</a></li>
        <li className="special"><a href="/announsements">Announcement</a></li>
        <li className="special"><a href="/contact">Contact</a></li>
        {!auth.user ? (
        <>
           <li>
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
            </li>
            <li className="profile-icon icon special">
              <a href="/login">Login</a>
            </li>
            <li className="profile-icon icon special">
              <a href="/register">Register</a>
            </li>
        </>
      ) : (<>
            {/* <h2>{JSON.stringify(auth,null,4)}</h2> */}
            {/* {console.log(JSON.stringify(auth, null, 4))} */}
            <li>
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
            </li>

            <li>
              <div className="profile-icon icon">
                <Link
                  to={`/profile/${auth?.user?.role === 1 ? "admin" : "user"}`}
                >
                  <i className="fa-regular fa-user"></i>
                </Link>
              </div>
            </li>

            <li>
              <div className="profile-icon icon">
                <a onClick={handleLogout} href="#">
                  <i className="fa-solid fa-right-from-bracket"></i>
                </a>
              </div>
            </li>
            
            <li>
            <div className="cart-icon icon">
              <NavLink to="/card" className="navlink">
                <Badge badgeContent={cart?.length} color="primary">
                <img src={bowl} alt="dog-bowl" />
                </Badge>
                {/* cart?.reduce((total, item) => total + item.quantity, 0) */}
                {/* <span>{cart?.length}</span> */}
              </NavLink>
            </div>
            </li>
            

      </>)}
      </ul>
    </nav>
    </>
   
  );
};

export default Header;
