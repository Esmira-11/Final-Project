import React, { useState } from "react";
import "./contact.scss";
import Layout from "../../components/Layout";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { name, email, message });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <Layout>
        <div className="contact-page">
          <div className="contact-page-container">
            <div className="contact-page-container-left">
              <div className="contact-page-container-left-title">
                <h2>Our Contacts</h2>
              </div>
              <div className="contact-page-container-left-details">
                <div className="detail">
                  <div className="detail-left">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="detail-right">
                    <div className="detail-title">
                      <h3>Location</h3>
                    </div>
                    <div className="detail-content">
                      <p>808 Vale Street Bay Magna</p>
                    </div>
                  </div>
                </div>
                <div className="detail">
                  <div className="detail-left">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div className="detail-right">
                    <div className="detail-title">
                      <h3>Phone</h3>
                    </div>
                    <div className="detail-content">
                      <p>+91 123 456 789</p>
                    </div>
                  </div>
                </div>
                <div className="detail">
                  <div className="detail-left">
                    <i className="fa-solid fa-fax"></i>
                  </div>
                  <div className="detail-right">
                    <div className="detail-title">
                      <h3>Phone</h3>
                    </div>
                    <div className="detail-content">
                      <p>0123-456-789</p>
                    </div>
                  </div>
                </div>
                <div className="detail">
                  <div className="detail-left">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div className="detail-right">
                    <div className="detail-title">
                      <h3>Email</h3>
                    </div>
                    <div className="detail-content">
                      <p>info@examples.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-page-container-right">
              <div className="form-title">
                <h3>Have Any Questions</h3>
              </div>
              <div className="form-description">
                <p>
                  Please feel free to get in touch with us using the contact
                  form below. We’d love to hear for you.
                </p>
              </div>
              <div className="form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      value={message}
                      placeholder="Message..."
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>

          <div className="contact-page-bottom">
            <iframe
              loading="lazy"
              src="https://maps.google.com/maps?q=London%20Eye%2C%20London%2C%20United%20Kingdom&amp;t=m&amp;z=10&amp;output=embed&amp;iwloc=near"
              title="London Eye, London, United Kingdom"
              aria-label="London Eye, London, United Kingdom"
            ></iframe>
            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96708.34194156103!2d-74.03927096447748!3d40.759040329405195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x4a01c8df6fb3cb8!2sSolomon%20R.%20Guggenheim%20Museum!5e0!3m2!1sen!2sbd!4v1619410634508!5m2!1sen!2s"  allowfullscreen="" loading="lazy"></iframe> */}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Contact;
