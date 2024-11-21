import React, { useState } from "react";
import { FaMapLocation } from "react-icons/fa6";
import cl from "./Welcome.module.css";
import img1 from "../../../../images/DALL·E 2024-11-20 23.20.51 - A modern and visually appealing app interface for 'City 312,' designed for urban tourism and traffic solutions in Bishkek. The image should feature el.webp";

const Welcome = () => {
  const [active, setActive] = useState(false);

  return (
    <div className={cl.backCon}>
      <div className={cl.container}>
        <div className={`${cl.ava} ${active ? cl.active : ""}`}>
          <img src={img1} alt="City 312 app interface" />
        </div>
        <div className={cl.welcome_text}>
          <div className={cl.title}>in312</div>
          <div className={cl.description}>Погрузись в мир туризма</div>
        </div>
        <div className={cl.next} onClick={() => setActive(true)}>
          Join
        </div>
      </div>
    </div>
  );
};

export default Welcome;
