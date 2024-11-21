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
	const [userData, setUserData] = useState([])
 



  useEffect(()=>{
    setUserData(JSON.parse(localStorage.getItem('userData')))
  },[])

	const handleLogout = async (navigate) => {
    try {
      await signOut(auth);
      navigate("/");
      localStorage.removeItem('userData')
      localStorage.removeItem('userData2')

    } catch (error) {
      console.log("ошибка при выходе");
    }
  };

  const navigate = useNavigate();





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
              <img src={userData.avatar || defaultAvatar} alt="User Avatar" className={cl.image} />
            </div>
            <div className={cl.username}>{userData.name}</div>
          </div>
          <div className="balance">
            {userData.tokens} <FaMoneyBill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
