import React from "react";
import "./footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-container-top">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon">
                <i className="fa-solid fa-paw"></i>
              </div>
              <div className="logo-name">
                <h2>Possy Sunny</h2>
              </div>
            </div>

            <div className="brand-description">
              <p>
                Accessories for your pets, a variety of food, toys, clothes in
                our store
              </p>
            </div>
          </div>

          <div className="links">
            <h2>Links</h2>
            <div className="link">
              <a href="#">Home</a>
            </div>
            <div className="link">
              <a href="#">About Us</a>
            </div>
            <div className="link">
              <a href="#">Shop</a>
            </div>
            <div className="link">
              <a href="#">Announcement</a>
            </div>
          </div>

          {/* <div className="hours">
            <h2>Opening Hours</h2>
            <p>Mon - Fri: 9.00AM - 6.00PM</p>
            <p>Saturday: 9.00AM - 6.00PM</p>
            <p>Sunday: Closed</p>
          </div> */}

          <div className="contact">
            <h2>Contact Us</h2>
            <div className="contact-box">
              <i className="fa-solid fa-location-dot"></i>
              {/* <p>National park,d1 588436,United States</p> */}
              <p>808 Vale Street Bay Magna</p>
            </div>
            <div className="contact-box">
              <i className="fa-solid fa-phone"></i>
              <p>+91 123 456 789</p>
            </div>
            <div className="contact-box">
              <i className="fa-solid fa-fax"></i>
              <p>0123-456-789</p>
            </div>
            <div className="contact-box">
              <i className="fa-solid fa-envelope"></i>
              <p>info@examples.com</p>
            </div>
          </div>

          <div className="find-payment">
            <div className="find-us">
              <h2>Find Us On</h2>
              <div className="social-media-links">
                <div className="social-media-link">
                  <a href="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                </div>
                <div className="social-media-link">
                  <a href="#">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </div>
                <div className="social-media-link">
                  <a href="#">
                    <i className="fa-brands fa-whatsapp"></i>
                  </a>
                </div>
                <div className="social-media-link">
                  <a href="#">
                    <i className="fa-brands fa-pinterest"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="payment">
              <h2>Payment</h2>
              <div className="social-media-links">
                <div className="social-media-link">
                  <a href="#">
                    <i className="fa-brands fa-cc-visa"></i>
                  </a>
                </div>
                <div className="social-media-link">
                  <a href="#">
                    <i className="fa-brands fa-cc-mastercard"></i>
                  </a>
                </div>
                <div className="social-media-link">
                  <a href="#">
                    <i className="fa-brands fa-cc-paypal"></i>
                  </a>
                </div>
                <div className="social-media-link">
                  <a href="#">
                    <i className="fa-brands fa-cc-discover"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-container-bottom">
          <h2>Powered By OpenCart Your Store © 2023</h2>
        </div>
      </div>
    </div>
  );
}

export default Footer;
