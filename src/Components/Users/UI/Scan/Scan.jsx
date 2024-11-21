import { Scanner } from "@yudiel/react-qr-scanner";
import React, { useState } from "react";
import cl from "./Scan.module.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Scan = () => {
  const [scanned, setScanned] = useState(null);
  const navigate = useNavigate();

  const scanHandler = (result) => {
    setScanned(result[0].rawValue);

    console.log(result[0].rawValue);
  };

  return (
    <div className={cl.backCon}>
      <div className={cl.back} onClick={() => navigate("/home")}>
        <IoArrowBackOutline />
      </div>
      <div className={cl.title}>
        Просканируйте qr-code рядом с достопримечательностью Бишкека
      </div>
      <Scanner
        onScan={scanHandler}
        components={{ finder: false }}
        styles={{
          container: { height: "500px", width: 350, transform: "scaleX(-1)" },
        }}
      />
    </div>
  );
};

export default Scan;
