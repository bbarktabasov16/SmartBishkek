import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Добавляем Storage
import { getDatabase } from "firebase/database"; // Добавляем Realtime Database

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkFEXQHCeW5OcP2Wyo9PjOkrSf3fOfwTo",
  authDomain: "in312-aaafc.firebaseapp.com",
  projectId: "in312-aaafc",
  storageBucket: "in312-aaafc.appspot.com", // Исправлено: должен быть .appspot.com
  messagingSenderId: "558351429535",
  appId: "1:558351429535:web:d3d1768ce93030407c97aa",
  measurementId: "G-V3HLD9L9DH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Инициализируем приложение
export const analytics = getAnalytics(app); // Подключаем аналитику
export const auth = getAuth(app); // Экспортируем аутентификацию
export const provider = new GoogleAuthProvider(); // Провайдер Google
export const db = getFirestore(app); // Экспортируем Firestore
export const storage = getStorage(app); // Экспортируем Storage
export const rtdb = getDatabase(app); // Добавляем Realtime Database
