// saveUserLocation.js

import { getDatabase, ref, set, onValue } from 'firebase/database';
import { rtdb } from './firebase'; // Импортируем rtdb

// Сохранение местоположения пользователя в Realtime Database
export const saveUserLocation = (uid, latitude, longitude) => {
  set(ref(rtdb, 'locations/' + uid), {
    latitude,
    longitude,
    timestamp: Date.now(),
  });
};

// Получение местоположения пользователя из Realtime Database
export const getUserLocation = (uid, callback) => {
  const locationRef = ref(rtdb, 'locations/' + uid);
  onValue(locationRef, (snapshot) => {
    const data = snapshot.val();
    callback(data); // Передаем данные в коллбек
  });

  return () => locationRef; // Возвращаем функцию для отмены подписки
};
