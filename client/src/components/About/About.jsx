import React from "react";
import img from "../../assets/images/about-img.png";
import "./about.scss";

function About() {
  return (
    <div className="about">
      <div className="about-left">
        <img src={img} alt="about-img" />
      </div>
      <div className="about-right">
        <div className="about-right-name">
          <h3>About Us</h3>
        </div>
        <div className="about-right-title">
          <h2>
            Best Agency For <span>Your Pets</span>
          </h2>
        </div>
        <div className="about-right-content">
          <p>
            Accessories for your pets, a variety of food, toys, clothes in our
            store
          </p>
        </div>
        <div className="about-right-boxes">
          <div className="about-right-boxes-top">
            <div className="about-right-boxes-title">
              <h3>From 8 AM To 10 PM</h3>
            </div>
            <div className="about-right-boxes-content">
              <p>Our working hours</p>
            </div>
          </div>
          <div className="about-right-boxes-bottom">
            <div className="about-right-boxes-title">
              <h3>Trending Favourite Toys</h3>
            </div>
            <div className="about-right-boxes-content">
              <p>You can buy a variety of toys for your pets in our store</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
