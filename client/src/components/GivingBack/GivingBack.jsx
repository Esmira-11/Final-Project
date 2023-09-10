import React from "react";
import "./givingback.scss";
import { useNavigate } from "react-router-dom";

function GivingBack() {
  let navigate = useNavigate();

  return (
    <div className="giving-back-section">
      <div className="giving-back-section-title">
        <h2>GIVING BACK PROJECT</h2>
      </div>
      <div className="giving-back-section-content">
        <p className="first-paragraph">With every product you purchase, </p>
        <p>Possy Sunny helps provide food to dogs in need</p>
      </div>
      <div className="giving-back-section-btn">
        <button onClick={() => navigate("/shop")}>Take A Part</button>
      </div>
    </div>
  );
}

export default GivingBack;
