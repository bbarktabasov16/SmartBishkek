import React, { useEffect, useState } from 'react';
import Css from './auth.module.css';
import Logo from '../../../images/Surreal_Digital_Landscape_Blending_Kyrgyz_Culture_And_Nature-removebg-preview.png';
import { auth, provider } from '../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase'; // Путь к вашему экземпляру Firestore
import { useAuth } from "../../../AuthContext";

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [user, navigate]);

  // Получение данных пользователя из Firestore
  const fetchUserData = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        localStorage.setItem('userData', JSON.stringify(userData));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Функция для входа с помощью email и пароля
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      fetchUserData(userCredential.user.uid);
      setEmail('');
      setPassword('');
      setError('');
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  // Функция для входа через Google
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          tokens: 0,
          role: 'user',
          avatar: user.photoURL || false,
          level: 0,
          achievements: [],
        });
      }

      await fetchUserData(user.uid);
      setError('');
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={Css.backCon}>
      <div className={Css.Block}>
        <div className={Css.loginContainer}>
          <div className={Css.loginCard}>
            <div className={Css.logo}>
              <img src={Logo} alt="EcoTourQuest Logo" />
            </div>
            <h1>in312</h1>
            <p>Explore green destinations with rewards!</p>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                className={Css.inputField}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className={Css.inputField}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a href="#" className={Css.forgotPassword}>
                Forgot your password?
              </a>
              <button type="submit" className={Css.loginButton}>
                Log in
              </button>
            </form>
            <div className={Css.socialLogin}>
              <hr />
              <p>or</p>
              <div className={Css.socialButtons}>
                <button className={Css.googleButton} onClick={handleGoogleLogin}>
                  Google
                </button>
              </div>
            </div>
            <p className={Css.signuplink}>
              No have an account? <Link to={'/reg'}>Create one account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
