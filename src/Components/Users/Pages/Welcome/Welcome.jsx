import React from "react";
import { FaMapLocation } from "react-icons/fa6";

const Welcome = () => {
  return (
    <div>
      <div className="welcome_text">
        <div className="title">SmartCity Bishkek</div>
        <div className="description">
          Real-time traffic tracking and navigation
        </div>
      </div>
      <div className="ava">
        <img src="" alt="" />
      </div>
      <div className="next">
        <FaMapLocation />
      </div>
    </div>
  );
};

export default Welcome;
