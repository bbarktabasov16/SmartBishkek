// import React, { useEffect, useState } from 'react';
// import cl from "./Map.module.css";
// import { useNavigate } from 'react-router-dom';
// import { FaHome, FaMapMarked, FaSearchLocation } from 'react-icons/fa';
// import { IoPerson } from 'react-icons/io5';
// import { CiLogout } from 'react-icons/ci';
// import { signOut } from 'firebase/auth';
// import { auth } from '../../../../firebase';
// import Marker1 from '../../../../images/marker.png'


// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { saveUserLocation } from '../../../../saveUserLocation';
// import L from "leaflet";



// const Map = () => {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState([]); // Начальное состояние null
//   const [position, setPosition] = useState(null); // Изначально null
//   const [loading, setLoading] = useState(true); // Для отслеживания загрузки местоположения

//   const customIcon = L.icon({
//     iconUrl: Marker1, // Путь к вашему изображению
//     iconSize: [40, 40], // Размер иконки [ширина, высота]
//     iconAnchor: [20, 40], // Точка привязки [X, Y] (например, нижний центр)
//     popupAnchor: [0, -40], // Точка привязки всплывающего окна [X, Y]
//   });

//   // Чтение данных пользователя из Local Storage
//   useEffect(() => {
//     const storedUserData = localStorage.getItem("userData2");

//     if (storedUserData) {
//       try {
//         setUserData(JSON.parse(storedUserData));
//       } catch (error) {
//         console.error("Ошибка при чтении userData из localStorage:", error);
//       }
//     }
//   }, []);

//   const uid = userData?.uid;

//   // Получение текущего местоположения при монтировании компонента
//   useEffect(() => {
//     const fetchInitialLocation = () => {
//       navigator.geolocation.getCurrentPosition(
//         (location) => {
//           const { latitude, longitude } = location.coords;
//           setPosition([latitude, longitude]);
//           setLoading(false);

//           // Сохраняем местоположение в Firestore, если UID есть
//           if (uid) {
//             saveUserLocation(uid, latitude, longitude);
//           }
//         },
//         (error) => {
//           console.error("Ошибка получения начального местоположения:", error);
//           setLoading(false); // Завершаем загрузку даже при ошибке
//         },
//         { enableHighAccuracy: true }
//       );
//     };

//     fetchInitialLocation();
//   }, [uid]);

//   // Обновление местоположения в реальном времени
//   useEffect(() => {
//     if (!uid || !position) return;

//     const watchId = navigator.geolocation.watchPosition(
//       (location) => {
//         const { latitude, longitude } = location.coords;
//         setPosition([latitude, longitude]);

//         // Сохраняем обновленное местоположение
//         saveUserLocation(uid, latitude, longitude);
//       },
//       (error) => console.error("Ошибка отслеживания местоположения:", error),
//       { enableHighAccuracy: true }
//     );

//     return () => navigator.geolocation.clearWatch(watchId); // Очищаем слежение при размонтировании
//   }, [uid, position]);

//   // Выход из аккаунта
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       localStorage.removeItem("userData");
//       localStorage.removeItem("userData2");
//       navigate("/");
//     } catch (error) {
//       console.error("Ошибка при выходе:", error);
//     }
//   };

//   if (loading) {
//     return <div className={cl.loading}>Загрузка карты...</div>; // Показываем индикатор загрузки
//   }

//   return (
//     <div className={cl.backCon}>
//       <div className={cl.container}>
//         <div className={cl.Navbar}>
//           <div className={cl.logo}>
//             <span>Tourist</span>
//             <span>312</span>
//           </div>
//           <div className={cl.icons}>
//             <div className={cl.icon} onClick={() => navigate("/home")}>
//               <FaHome />
//               <li>Home</li>
//             </div>

//             <div className={cl.icon} onClick={() => navigate("/search")}>
//               <FaSearchLocation /> <li>Search</li>
//             </div>
//             <div className={cl.icon} onClick={() => navigate("/map")}>
//               <FaMapMarked /> <li>Map</li>
//             </div>
//             <div className={cl.icon} onClick={() => navigate("/profile")}>
//               <IoPerson /> <li>Profile </li>
//             </div>
//           </div>
//           <div className={cl.logout} onClick={() => handleLogout(navigate)}>
//             <CiLogout />
//             <li>Exit</li>
//           </div>
//         </div>
//         <div className={cl.content}>
//           <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
//             />
//             <Marker position={position} icon={customIcon}>
//               <Popup>Вы находитесь здесь!</Popup>
//             </Marker>
//           </MapContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Map;


import React, { useEffect, useState } from 'react';
import cl from "./Map.module.css";
import { useNavigate } from 'react-router-dom';
import { FaHome, FaMapMarked, FaSearchLocation } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import { CiLogout } from 'react-icons/ci';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase';
import Marker1 from '../../../../images/marker.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { saveUserLocation, getUserLocation } from '../../../../saveUserLocation'; // Функции для работы с Realtime Database
import L from "leaflet";

// Функция для получения текущего местоположения и его сохранения в базе данных
const Map = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [realtimeLocation, setRealtimeLocation] = useState(null);

  const customIcon = L.icon({
    iconUrl: Marker1, // Путь к вашему изображению
    iconSize: [40, 40], // Размер иконки [ширина, высота]
    iconAnchor: [20, 40], // Точка привязки [X, Y] (например, нижний центр)
    popupAnchor: [0, -40], // Точка привязки всплывающего окна [X, Y]
  });

  // Чтение данных пользователя из Local Storage
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData2");

    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData));
      } catch (error) {
        console.error("Ошибка при чтении userData из localStorage:", error);
      }
    }
  }, []);

  const uid = userData?.uid;

  // Получение текущего местоположения при монтировании компонента
  useEffect(() => {
    const fetchInitialLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          setPosition([latitude, longitude]);
          setLoading(false);

          // Сохраняем местоположение в Realtime Database
          if (uid) {
            saveUserLocation(uid, latitude, longitude);
          }
        },
        (error) => {
          console.error("Ошибка получения начального местоположения:", error);
          setLoading(false);
        },
        { enableHighAccuracy: true }
      );
    };

    fetchInitialLocation();
  }, [uid]);

  // Обновление местоположения в реальном времени с Realtime Database
  useEffect(() => {
    if (!uid) return;

    // Получение местоположения из Realtime Database
    const locationRef = getUserLocation(uid, (location) => {
      if (location) {
        setRealtimeLocation(location);
      }
    });

    // Следим за изменениями местоположения
    const watchId = navigator.geolocation.watchPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        setPosition([latitude, longitude]);

        // Сохраняем обновленное местоположение в Realtime Database
        if (uid) {
          saveUserLocation(uid, latitude, longitude);
        }
      },
      (error) => console.error("Ошибка отслеживания местоположения:", error),
      { enableHighAccuracy: true }
    );

    return () => {
      locationRef(); // Очистка подписки
      navigator.geolocation.clearWatch(watchId); // Очистка слежения
    };
  }, [uid]);

  // Выход из аккаунта
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
    return <div className={cl.loading}>Загрузка карты...</div>;
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
          <div className={cl.logout} onClick={() => handleLogout(navigate)}>
            <CiLogout />
            <li>Exit</li>
          </div>
        </div>
        <div className={cl.content}>
          <MapContainer center={position || realtimeLocation} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
            />
            {(position || realtimeLocation) && (
              <Marker position={position || realtimeLocation} icon={customIcon}>
                <Popup>Вы находитесь здесь!</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Map;
