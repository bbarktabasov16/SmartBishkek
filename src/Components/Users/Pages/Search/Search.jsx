import React, { useState } from "react";
import cl from "./Search.module.css";
import { useNavigate } from "react-router-dom";
import { FaHome, FaMapMarked, FaSearchLocation } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";
import 'bootstrap/dist/css/bootstrap.min.css';


// Массив достопримечательностей
const attractions = [
  {
    name: "Ишенаалы Арабай уулу",
    img: "https://este.kg/media/article_images/81799067fad56887956c871111cce49f_1_K1wzsgp.jpg",
    description: "https://este.kg/ru/ishenaalyi-arabaj-uulu/",
  },
  {
    name: "Красногвардейцам",
    img: "https://este.kg/media/article_images/30884_ymfLQ15.jpg",
    description: "https://este.kg/ru/krasnogvardejtsam/",
  },
  {
    name: "Иваницын Алексей",
    img: "https://este.kg/media/article_images/post-15-0-93802500-1575273518_rP4rcGG.jpg",
    description: "https://este.kg/ru/ivanitsyin-aleksej/",
  },
  {
    name: "Баткенде курман болгон жоокерлерге",
    img: "https://este.kg/media/article_images/imgonline-com-ua-Resize-c6b8OvY9AA0MTZr_W5mCTJc.jpg",
    description: "https://este.kg/ru/batkende-kurman-bolgon-zhookerlerge/",
  },
  {
    name: "Бегелдинов Талгат",
    img: "https://este.kg/media/article_images/31642_1pby1w3.jfif",
    description: "https://este.kg/ru/begeldinov-talgat/",
  },
  {
    name: "Жеңиш эстелиги",
    img: "https://este.kg/media/article_images/1030639563_cFkAAU8.jpg",
    description: "https://este.kg/ru/zheish-esteligi/",
  },
  {
    name: "Героям-комсомольцам",
    img: "https://este.kg/media/article_images/imgonline-com-ua-Resize-4mFPt6YZ4QMr_v2cBKsx.jpg",
    description: "https://este.kg/ru/geroyam-komsomoltsam/",
  },
  {
    name: "Эл куту",
    img: "https://este.kg/media/article_images/32.jpg",
    description: "https://este.kg/ru/el-kutu/",
  },
];

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // Статус поиска

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

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredAttractions([]); // Очищаем результаты при пустом запросе
      setIsSearching(false); // Скрываем результаты поиска
    } else {
      setIsSearching(true); // Показываем результаты поиска
      const filtered = attractions.filter((attraction) =>
        attraction.name.toLowerCase().includes(query)
      );
      setFilteredAttractions(filtered);
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
              <IoPerson /> <li>Profile</li>
            </div>
          </div>
          <div className={cl.logout} onClick={() => handleLogout(navigate)}>
            <CiLogout />
            <li>Exit</li>
          </div>
        </div>

        <div className={cl.content}>
          {/* Поле для ввода запроса */}

          <div class="form-floating">
            <input
              class="form-control"
              placeholder="Leave a comment here"
							onChange={handleSearch}
              id="floatingTextarea"
            />
            <label for="floatingTextarea">Поиск</label>
          </div>

          {/* Показ результатов поиска */}
          {isSearching && filteredAttractions.length > 0 && (
            <div className={cl.results}>
              {filteredAttractions.map((attraction, index) => (
                <div key={index} className={cl.card}>
                  <img src={attraction.img} alt={attraction.name} />
                  <div className={cl.cardContent}>
                    <h3>{attraction.name}</h3>
                    <a
                      href={attraction.description}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Подробнее
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Если результатов нет */}
          {isSearching && filteredAttractions.length === 0 && (
            <p>Ничего не найдено</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
