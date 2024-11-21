import React from 'react'
import cl from "./Map.module.css"
import { useNavigate } from 'react-router-dom'
import { FaHome, FaMapMarked, FaSearchLocation } from 'react-icons/fa'
import { IoPerson } from 'react-icons/io5'
import { CiLogout } from 'react-icons/ci'
import { signOut } from 'firebase/auth'
import { auth } from '../../../../firebase'

const Map = () => {
	const navigate = useNavigate()
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
          <div className={cl.logout} onClick={() => handleLogout(navigate)}>
            <CiLogout />
            <li>Exit</li>
          </div>
        </div>
        <div className={cl.content}>
					<div className={cl.title}>Карта</div>
					<div className={cl.map}>

					</div>
        </div>
      </div>
		</div>
	)
}

export default Map
