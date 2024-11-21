import React, { useEffect, useState } from "react";
import cl from "./Profile.module.css";
import {
  FaHome,
  FaMapMarked,
  FaSearchLocation,
  FaMoneyBill,
} from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../../../images/free-icon-user-847969.png";
import { auth } from "../../../../firebase";
import { signOut } from "firebase/auth";

const Profile = () => {
  const [userData, setUserData] = useState(null); // Начальное состояние null
  const [loading, setLoading] = useState(true); // Флаг загрузки
  const navigate = useNavigate();

  useEffect(() => {
    // Извлекаем данные из localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData));
      } catch (error) {
        console.error("Ошибка при чтении userData из localStorage:", error);
      }
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

  // Если данные загружаются, показываем индикатор загрузки
  if (loading) {
    return <div className={cl.loading}>Загрузка данных...</div>;
  }

  // Если данные отсутствуют, отображаем сообщение
  if (!userData) {
    return <div className={cl.error}>Не удалось загрузить данные профиля.</div>;
  }

  return (
    <div className={cl.backCon}>
      <div className={cl.container}>
        <div className={cl.Navbar}>
          <div className={cl.logo}>
            <span>Tourist</span>
            <span>312</span>
          </div>
          <div className={cl.icons}>
            <div className={cl.icon} onClick={() => navigate("/home")}>
              <FaHome />
              <li>Home</li>
            </div>

            <div className={cl.icon} onClick={() => navigate("/search")}>
              <FaSearchLocation /> <li>Search</li>
            </div>
            <div className={cl.icon} onClick={() => navigate("/map")}>
              <FaMapMarked /> <li>Map</li>
            </div>
            <div className={cl.icon} onClick={() => navigate("/profile")}>
              <IoPerson /> <li>Profile </li>
            </div>
          </div>
          <div className={cl.logout} onClick={handleLogout}>
            <CiLogout />
            <li>Exit</li>
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
            <div className={cl.username}>{userData.name || "Guest"}</div>
            <div className={cl.balance}>
              {userData.tokens || 0} <FaMoneyBill />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
