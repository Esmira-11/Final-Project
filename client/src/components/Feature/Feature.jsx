import React from "react";
import "./feature.scss";

function Feature() {
  return (
    <div className="feature">
      <div className="feature-box">
        <div className="feature-box-content">
          <div className="feature-box-top">
            <div className="feature-box-title">
              <h3>
                NATURAL <br /> INGREDIENTS
              </h3>
            </div>
          </div>
          <div className="feature-box-center">
            <div className="feature-box-title">
              <h3>
                100% <br /> HOMEMADE
              </h3>
            </div>
          </div>
          <div className="feature-box-bottom">
            <div className="feature-box-title">
              <h3>
                SOURCED IN <br /> THE US
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feature;
