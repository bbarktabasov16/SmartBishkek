import React, { useEffect, useState } from 'react';
import Css from './auth.module.css';
import Logo from '../../../images/Surreal_Digital_Landscape_Blending_Kyrgyz_Culture_And_Nature-removebg-preview.png';
import { auth, provider } from '../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';  // Путь к вашему экземпляру Firestore
import { useAuth } from "../../../AuthContext";


function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Если пользователь авторизован, перенаправляем его на домашнюю страницу
      navigate("/home", { replace: true });
    }
  }, [user, navigate]);

  // Функция для регистрации с помощью email и пароля
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      setError('');
      navigate('/home');
    } catch (error) {
      setError(error.message); // Если произошла ошибка, выводим ее
    }
  };

  // Функция для входа через Google
  const handleGoogleLogin = async () => {
    try {
      // Открываем окно для входа через Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Проверяем, существует ли пользователь в Firestore
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // Если пользователя нет в базе данных, создаем новый документ
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          tokens: 0,
          role: 'user',
          avatar: user.photoURL || false,
          level: 0,
          achievements: []
        });
      }

      setError('');
      navigate('/home');  // Переход на главную страницу после входа
    } catch (error) {
      setError(error.message); // Если произошла ошибка, выводим ее
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
