import React from "react";
import cl from "./Profile.module.css"
import { FaHome, FaMapMarked, FaSearchLocation } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { FaMoneyBill } from "react-icons/fa";

const Profile = () => {
  return (
    <div className={cl.backCon}>
      <div className={cl.container}>
        <div className={cl.Navbar}>
          <div className={cl.logo}>Tourist312</div>
          <div className={cl.icons}>
            <div className={cl.icon}>
              <FaHome /> Home
            </div>
            <div className={cl.icon}>
              <FaSearchLocation /> Search
            </div>
            <div className={cl.icon}>
              <FaMapMarked /> Map
            </div>
            <div className={cl.icon}>
              <IoPerson /> Profile
            </div>
          </div>
          <div className={cl.logout}>
            <CiLogout />
            Exit
          </div>
        </div>
				<div className={cl.content}>
					<div className={cl.title}>Profile</div>
					<div className={cl.ava}>
						<div className={cl.img_ava}></div>
						<div className={cl.username}>Bekzat</div>
					</div>
					<div className="balance">
						0 
						<FaMoneyBill />	
					</div>
				</div>
      </div>
    </div>
  );
};

export default Profile;
