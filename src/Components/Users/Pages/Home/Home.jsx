import React, { useEffect, useState } from "react";
import cl from "./Home.module.css";
import user_img from "../../../../images/free-icon-user-847969.png";
import defaultUserImg from "../../../../images/free-icon-user-847969.png";
import { format } from "date-fns";
import { FaHome } from "react-icons/fa";
import { FaSearchLocation } from "react-icons/fa";
import { FaMapMarked } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { FaTree } from "react-icons/fa6";
import { FaBicycle } from "react-icons/fa";
import { GiEcology } from "react-icons/gi";
import { FaCompass } from "react-icons/fa";
import { IoMdQrScanner } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";
import { ref } from "firebase/storage";

const Home = () => {
  const [currentTime, setCurrentTime] = useState("");
	const [userImage, setUserImage] = useState(JSON.parse(localStorage.getItem('userData')).photoURL);

  const navigate = useNavigate()
	console.log(JSON.parse(localStorage.getItem('userData')).photoURL)

  const handleLogout = async (navigate) => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log("ошибка при выходе");
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = format(now, "MMMM dd, HH:mm");
      setCurrentTime(formattedTime);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleCategoryClick = (label) => {
    if (label === "Scan") {
      // Действие при нажатии на "Scan"
      navigate("/scan");
    } else {
      alert(`Clicked on ${label}`);
    }
  };

  const categories = [
    { icon: <FaBicycle />, label: "Outdoor" },
    { icon: <GiEcology />, label: "Eco" },
    { icon: <FaCompass />, label: "Green" },
    { icon: <IoMdQrScanner />, label: "Scan" },
  ];

  return (
    <div className={cl.backCon}>
      <div className={cl.container}>
        <div className={cl.Navbar}>
          <div className={cl.logo}><span>Tourist</span><span>312</span></div>
          <div className={cl.icons}>
            <div className={cl.icon}>
              <FaHome /><li>Home</li>
            </div>
          
            <div className={cl.icon} onClick={() => navigate("/search")}>
              <FaSearchLocation />  <li>Search</li>

            </div>
            <div className={cl.icon}>
              <FaMapMarked />  <li>Map</li>
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
          <div className={cl.header}>
            <p>Current time: {currentTime}</p>
            <img src={userImage || defaultUserImg} alt="User Profile" className={cl.user_img} />
          </div>

          <section className={cl.explore}>
            <h2>Explore nearby eco</h2>
            <div className={cl.cards}>
              <div className={cl.card}>
                <div className={cl.card_header}>
                  <div className={cl.tag}>Park visit</div>
                  <FaTree />
                </div>
                <div className={cl.description}>
                  <h3>Nature Reserve</h3>
                  <p>Next eco event: May 23</p>
                </div>
              </div>
              <div className={cl.card}>
                <div className={cl.card_header}>
                  <div className={cl.tag}>Park visit</div>
                  <FaTree />
                </div>
                <div className={cl.description}>
                  <h3>Nature Reserve</h3>
                  <p>Next eco event: May 23</p>
                </div>
              </div>


            </div>
          </section>

          <section className={cl.adventures}>
            <h2>Green Adventures</h2>
            <div className={cl.categories}>
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryClick(category.label)}
                >
                  {category.icon} <br /> {category.label}
                </button>
              ))}
            </div>
          </section>

          <section className={cl.recommended}>
            <h2>Recommended</h2>
            <div className={cl.cards}>
              <div className={cl.card}>
                <div className={cl.card_header}>
                  <div className={cl.tag}>Park visit</div>
                  <FaTree />
                </div>
                <div className={cl.description}>
                  <h3>Nature Reserve</h3>
                  <p>Next eco event: May 23</p>
                </div>
              </div>



            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
