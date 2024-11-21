// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from "firebase/auth"; // Используем getAuth вместо прямого импорта из 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkFEXQHCeW5OcP2Wyo9PjOkrSf3fOfwTo",
  authDomain: "in312-aaafc.firebaseapp.com",
  projectId: "in312-aaafc",
  storageBucket: "in312-aaafc.firebasestorage.app",
  messagingSenderId: "558351429535",
  appId: "1:558351429535:web:d3d1768ce93030407c97aa",
  measurementId: "G-V3HLD9L9DH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app); // Используем getAuth для получения объекта auth
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
const analytics = getAnalytics(app);
