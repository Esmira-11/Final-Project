import React from "react";
import "./services.scss";

function Services() {
  return (
    <div className="services">
      <div className="services-card">
        <div className="services-card-top">
          <i className="fa-solid fa-headset"></i>
        </div>
        <div className="services-card-bottom">
          <h3>24/7 Friendly Support</h3>
        </div>
      </div>
      <div className="services-card second">
        <div className="services-card-top">
          <i className="fa-solid fa-shield-heart"></i>
        </div>
        <div className="services-card-bottom">
          <h3>Quality Guaranteed</h3>
        </div>
      </div>
      <div className="services-card third">
        <div className="services-card-top">
          <i className="fa-solid fa-rotate-left"></i>
        </div>
        <div className="services-card-bottom">
          <h3>7 Days Easy Return</h3>
        </div>
      </div>
      <div className="services-card">
        <div className="services-card-top">
          <i className="fa-solid fa-truck"></i>
        </div>
        <div className="services-card-bottom">
          <h3>Free Shipping</h3>
        </div>
      </div>
    </div>
  );
}

export default Services;
