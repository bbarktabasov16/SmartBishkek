import React, { useEffect, useState } from "react";
import cl from "./Profile.module.css";
import { FaHome, FaMapMarked, FaSearchLocation, FaMoneyBill } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../../../images/free-icon-user-847969.png"; // Импорт дефолтной картинки
import { auth } from "../../../../firebase";
import { signOut } from "firebase/auth";

const Profile = () => {
  const [userData, setUserData] = useState(null); // null для состояния до загрузки
  const [loading, setLoading] = useState(true); // Флаг загрузки

  const navigate = useNavigate();

  useEffect(() => {
    // Извлекаем данные из localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      console.warn("Пользовательские данные отсутствуют в localStorage");
    }
    setLoading(false); // Завершаем загрузку
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userData");
      localStorage.removeItem("userData2");
      navigate("/");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  if (loading) {
    // Показываем спиннер или сообщение при загрузке данных
    return <p>Loading profile...</p>;
  }

  if (!userData) {
    // Если данные не загружены, показываем ошибку или перенаправляем
    return (
      <div>
        <p>User data not found. Please log in again.</p>
        <button onClick={() => navigate("/")}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className={cl.backCon}>
      <div className={cl.container}>
        <div className={cl.Navbar}>
          <div className={cl.logo}>Tourist312</div>
          <div className={cl.icons}>
            <div className={cl.icon} onClick={() => navigate("/home")}>
              <FaHome /> Home
            </div>
            <div className={cl.icon} onClick={() => navigate("/search")}>
              <FaSearchLocation /> Search
            </div>
            <div className={cl.icon}>
              <FaMapMarked /> Map
            </div>
            <div className={cl.icon}>
              <IoPerson /> Profile
            </div>
          </div>
          <div className={cl.logout} onClick={handleLogout}>
            <CiLogout />
            Exit
          </div>
        </div>
        <div className={cl.content}>
          <div className={cl.title}>Profile</div>
          <div className={cl.ava}>
            <div className={cl.img_ava}>
              <img
                src={userData.avatar || defaultAvatar}
                alt="User Avatar"
                className={cl.image}
              />
            </div>
            <div className={cl.username}>{userData.name || "Unknown User"}</div>
          </div>
          <div className="balance">
            {userData.tokens || 0} <FaMoneyBill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
