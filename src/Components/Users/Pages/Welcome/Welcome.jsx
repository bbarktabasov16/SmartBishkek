import React from "react";
import { FaMapLocation } from "react-icons/fa6";
import cl from "./Welcome.module.css"
import img1 from "../../../../images/DALL·E 2024-11-20 23.20.51 - A modern and visually appealing app interface for 'City 312,' designed for urban tourism and traffic solutions in Bishkek. The image should feature el.webp"

const Welcome = () => {
  return (
    <div className={cl.container}>
      <div className={cl.welcome_text}>
        <div className={cl.title}>SmartCity Bishkek</div>
        <div className={cl.description}>
          Real-time traffic tracking and navigation
        </div>
      </div>
      <div className={cl.ava}>
        <img src={img1} alt="" />
      </div>
      <div className={cl.next}>
        <FaMapLocation />
      </div>
    </div>
  );
};

export default Welcome;
