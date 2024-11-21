import { Scanner } from "@yudiel/react-qr-scanner";
import React, { useState } from "react";
import cl from "./Scan.module.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { list } from "../../../../data/data"; // Импортируем список ссылок из data.js

const Scan = () => {
  const [scanned, setScanned] = useState(null);
  const navigate = useNavigate();

  const scanHandler = (result) => {
    const scannedUrl = result[0].rawValue; // URL из сканера
    setScanned(scannedUrl);

    console.log(scannedUrl);

    if (list.includes(scannedUrl)) {
      // Если URL найден в списке
      console.log("Совпадение найдено! Отправка данных...");
      // Добавьте вашу логику отправки или обработки здесь
    } else {
      console.log("URL не найден в списке.");
    }
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
      {/* Выводим отсканированный результат для отладки */}
      {scanned && <div className={cl.result}>Результат: {scanned}</div>}
    </div>
  );
};

export default Scan;
