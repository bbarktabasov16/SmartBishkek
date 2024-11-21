import React, { useState } from 'react';
import Css from './auth.module.css';
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase'; // Путь к вашему экземпляру Firestore
import Logo from '../../../images/Surreal_Digital_Landscape_Blending_Kyrgyz_Culture_And_Nature-removebg-preview.png';
import { auth, provider } from '../../../firebase';

function Reg() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Сохраняем данные пользователя в Firestore и localStorage
  const saveUserData = async (uid, userData) => {
    try {
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, userData, { merge: true }); // Обновляем данные, если документ уже существует
      localStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = {
        name,
        email,
        tokens: 0,
        role: 'user',
        avatar: false,
        level: 0,
        achievements: [],
      };

      await saveUserData(user.uid, userData);

      setEmail('');
      setPassword('');
      setName('');
      setError('');
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      const userData = userDoc.exists()
        ? userDoc.data()
        : {
            name: user.displayName,
            email: user.email,
            tokens: 0,
            role: 'user',
            avatar: user.photoURL || false,
            level: 0,
            achievements: [],
          };

      if (!userDoc.exists()) {
        await saveUserData(user.uid, userData);
      }

      localStorage.setItem('userData', JSON.stringify(userData));
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
            <form onSubmit={handleRegister}>
              <input
                type="email"
                placeholder="Email"
                className={Css.inputField}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Name"
                className={Css.inputField}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className={Css.inputField}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className={Css.loginButton}>
                Create
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
              You have an account? <Link to={'/auth'}>Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reg;
