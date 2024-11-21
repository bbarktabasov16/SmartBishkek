import { Scanner } from "@yudiel/react-qr-scanner";
import React, { useEffect, useState } from "react";
import cl from "./Scan.module.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { list } from "../../../../data/data"; // Импортируем список ссылок из data.js
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { Alert } from 'antd';
import LoadingModal from "../Load/Loading";
import m1 from '../../../sound/1.mp3'

const Scan = () => {
  const [scanned, setScanned] = useState(null);
  const [userData, setUserData] = useState(null); 
  const [succes, setSucces] = useState(false)
  const [Loading, setLoading] = useState(false)

  const [currentBalance, setCurrenBalance] = useState() 
  // Данные пользователя из localStorage
  const navigate = useNavigate();

  const Scanned = new Audio(m1)

  console.log(userData);


  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData2"));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  
  const scanHandler = async (result) => {
    const scannedUrl = result[0]?.rawValue; // URL из сканера
    setScanned(scannedUrl);

    console.log(scannedUrl);

    // Проверка на null или undefined для scannedUrl
    if (!scannedUrl) {
      console.log("Отсутствует валидный URL из сканера.");
      return;
    }

    // Проверка, что list существует и является массивом
    if (!Array.isArray(list)) {
      console.error("Список ссылок не является массивом или не был загружен.");
      return;
    }

    if (list.includes(scannedUrl)) {
      try {
        setLoading(true)
        // Получаем ссылку на документ пользователя в Firestore
        const userRef = doc(db, "users", userData.uid);

        if (!userData?.uid) {
          console.error("UID пользователя не найден.");
          return;
        }

        // Получаем текущие данные пользователя из Firestore
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const currentData = userDoc.data();

          // Добавляем 10 токенов к текущему значению tokens
          const newTokens = (currentData.tokens || 0) + 10;

          // Обновляем данные в Firestore
          await updateDoc(userRef, { tokens: newTokens });

          console.log("Токены успешно добавлены:", newTokens);
          setSucces(true)
          Scanned.play()
          setLoading(false)
          setCurrenBalance(newTokens)


          // Обновляем данные в localStorage и состоянии
          const updatedUserData = { ...currentData, tokens: newTokens };
          localStorage.setItem("userData", JSON.stringify(updatedUserData));
          setUserData(updatedUserData);
        } else {
          console.error("Пользовательский документ не найден.");
        }
      } catch (error) {
        console.error("Ошибка при обновлении токенов:", error);
      }
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
        Просканируйте QR-код рядом с достопримечательностью Бишкека
      </div>
      <Scanner
        onScan={scanHandler}
        components={{ finder: false, audio:false }}
        styles={{
          container: { height: "500px", width: 350, transform: "scaleX(-1)", borderRadius:'20px' },
        }}
      />
      {/* Выводим отсканированный результат для отладки */}
      {succes ?  <Alert
      message="Вы получили +10"
      description={`
       Ваш баланс : ${currentBalance}
        `}
      type="success"
      showIcon
    /> : null}
    
    </div>
  );
};

export default Scan;
