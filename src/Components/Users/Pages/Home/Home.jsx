import React, { useEffect, useState } from "react";
import cl from "./Home.module.css";
import user_img from "../../../../images/free-icon-user-847969.png";
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



const Home = () => {
  const [currentTime, setCurrentTime] = useState("");


  const handleLogout = async (navigate) => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
console.log('ошибка при выходе')
    }
  };

  const navigate = useNavigate()
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
          <div className={cl.logo}>in312</div>
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
					<div className={cl.logout} onClick={handleLogout}>
						<CiLogout />
						Exit
					</div>
        </div>

        <div className={cl.content}>
          <div className={cl.header}>
            <p>Current time: {currentTime}</p>
            <img src={user_img} alt="User Profile" className={cl.user_img} />
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
                <button key={index}>
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
