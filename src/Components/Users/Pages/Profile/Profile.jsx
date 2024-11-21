import React, { useEffect, useState } from "react";
import cl from "./Profile.module.css";
import { FaHome, FaMapMarked, FaSearchLocation, FaMoneyBill } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import defaultAvatar from "../../../../images/free-icon-user-847969.png"; // Импорт дефолтной картинки
import { auth, storage } from "../../../../firebase";
import { signOut } from "firebase/auth";

const Profile = () => {
	const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')))
  const [imageUrl, setImageUrl] = useState(userData.photoURL);

	const handleLogout = async (navigate) => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log("ошибка при выходе");
    }
  };

  const navigate = useNavigate();


  // useEffect(() => {
  //   // Ссылка на изображение в Firebase Storage
  //   const imageRef = ref(storage, "avatars/bekzat-avatar.jpg"); // Замените путь на свой

  //   // Получение ссылки для загрузки
  //   getDownloadURL(imageRef)
  //     .then((url) => {
  //       setImageUrl(url); // Сохранение ссылки в состоянии
  //     })
  //     .catch((error) => {
  //       console.warn("Error fetching image URL, using default avatar:", error);
  //       setImageUrl(defaultAvatar); // Устанавливаем дефолтную картинку в случае ошибки
  //     });
  // }, []);

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
          <div className={cl.logout} onClick={() => handleLogout(navigate)}>
            <CiLogout />
            Exit
          </div>
        </div>
        <div className={cl.content}>
          <div className={cl.title}>Profile</div>
          <div className={cl.ava}>
            <div className={cl.img_ava}>
              <img src={imageUrl || defaultAvatar} alt="User Avatar" className={cl.image} />
            </div>
            <div className={cl.username}>{userData.displayName}</div>
          </div>
          <div className="balance">
            0 <FaMoneyBill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
