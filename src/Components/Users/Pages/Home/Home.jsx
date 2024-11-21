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
import p1 from '../../../../images/3.png'
import p2 from '../../../../images/1.png'
import p3 from '../../../../images/2.png'
import p4 from '../../../../images/4.png'
import p5 from '../../../../images/5.png'


import r1 from '../../../../images/rec/1.png'
import r2 from '../../../../images/rec/2.png'
import r3 from '../../../../images/rec/3.png'
import r4 from '../../../../images/rec/4.png'
import r5 from '../../../../images/rec/5.png'
import r6 from '../../../../images/rec/6.png'





const Home = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [userImage, setUserImage] = useState(
    JSON.parse(localStorage.getItem("userData2")).photoURL
  );

  const navigate = useNavigate();
  // console.log(JSON.parse(localStorage.getItem('userData2')).photoURL)

  const handleLogout = async (navigate) => {
    try {
      await signOut(auth);
      navigate("/");
      localStorage.removeItem("userData");
      localStorage.removeItem("userData2");
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
          <div className={cl.logo}>
            <span>Tourist</span>
            <span>312</span>
          </div>
          <div className={cl.icons}>
            <div className={cl.icon}>
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
          <div className={cl.header}>
            <p>Current time: {currentTime}</p>
            <img
              src={userImage || defaultUserImg}
              alt="User Profile"
              className={cl.user_img}
            />
          </div>

          <section className={cl.explore}>
            <h2>Места поблизости</h2>
            <div className={cl.cards}>
              <div className={cl.card} style={{backgroundImage:`url(${p1})`}}>
                <div className={cl.card_header}>
                  <div className={cl.tag}>Посетить</div>
                  <FaTree />
                </div>
                <div className={cl.description}>
                  <h3>Музей Великой Пустоты</h3>
                  <p>Открыто: 09:00 - 18:00</p>
                </div>
              </div>
              <div className={cl.card} style={{backgroundImage:`url(${p2})`}}>
                <div className={cl.card_header}>
                  <div className={cl.tag}>Посетить</div>
                  <FaTree />
                </div>
                <div className={cl.description}>
                  <h3>Мечеть Мустафа</h3>
                  <p>Открыто: 05:00 - 23:00</p>
                </div>
              </div>
              
              <div className={cl.card} style={{backgroundImage:`url(${p4})`}}>
                <div className={cl.card_header}>
                  <div className={cl.tag}>Посетить</div>
                  <FaTree />
                </div>
                <div className={cl.description}>
                  <h3>SPACENTER</h3>
                  <p>Открыто: 09:00 - 23:00</p>
                </div>
              </div>
              <div className={cl.card} style={{backgroundImage:`url(${p5})`}}>
                <div className={cl.card_header}>
                  <div className={cl.tag}>Посетить</div>
                  <FaTree />
                </div>
                <div className={cl.description}>
                  <h3>Шашлык центр</h3>
                  <p>Открыто: 09:00 - 23:00</p>
                </div>
              </div>
            </div>
          </section>

          <section className={cl.adventures}>
            <h2>Приключения</h2>
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
            <h2>Рекомендованные места</h2>
            <div className={cl.cards}>
              <div className={cl.card} style={{backgroundImage:`url(${r1})`}}>
                <div className={cl.card_header}>
                  <div className={cl.tag}>Посетить</div>
                  <FaTree />
                </div>
                <div className={cl.description}>
                  <h3>Монумент Дружбы народов</h3>
                  <p>Открыто: круглосуточно</p>
                </div>
              </div>
              <div className={cl.card} style={{backgroundImage:`url(${r2})`}}>
                <div className={cl.card_header}>
                  <div className={cl.tag}>Посетить</div>
                  <FaTree />
                </div>
                <div className={cl.description}>
                  <h3>Парк победы</h3>
                  <p>Открыто: круглосуточно</p>
                </div>
              </div>
              <div className={cl.card} style={{backgroundImage:`url(${r3})`}}>
                <div className={cl.card_header}>
                  <div className={cl.tag}>Посетить</div>
                  <FaTree />
                </div>
                <div className={cl.description}>
                  <h3>Панорама</h3>
                  <p>Открыто: круглосуточно</p>
                </div>
              </div>
              <div className={cl.card} style={{backgroundImage:`url(${r4})`}}>
                <div className={cl.card_header}>
                  <div className={cl.tag}>Посетить</div>
                  <FaTree />
                </div>
                <div className={cl.description}>
                  <h3>Дубовый парк</h3>
                  <p>Открыто: круглосуточно</p>
                </div>
              </div>
              <div className={cl.card} style={{backgroundImage:`url(${r5})`}}>
                <div className={cl.card_header}>
                  <div className={cl.tag}>Посетить</div>
                  <FaTree />
                </div>
                <div className={cl.description}>
                  <h3>Площадь победы</h3>
                  <p>Открыто: круглосуточно</p>
                </div>
              </div>
              <div className={cl.card} style={{backgroundImage:`url(${r6})`}}>
                <div className={cl.card_header}>
                  <div className={cl.tag}>Посетить</div>
                  <FaTree />
                </div>
                <div className={cl.description}>
                  <h3>Ынтымак парк</h3>
                  <p>Открыто: круглосуточно</p>
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
