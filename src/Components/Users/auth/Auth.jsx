import React, { useState } from 'react'
import Css from './auth.module.css'
import Logo from '../../../images/Surreal_Digital_Landscape_Blending_Kyrgyz_Culture_And_Nature-removebg-preview.png'
import { auth, provider } from '../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';


function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Вход в систему с использованием email и password
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      setError('');
      alert('Успешный вход')
    } catch (error) {
      setError(error.message); // Если произошла ошибка, выводим ее
      alert('Вы не вошли')
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Открываем окно Google для аутентификации
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Вошли как: ', user.displayName);
      setError('');
      // Здесь можно редиректировать пользователя, если необходимо
      // history.push('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={Css.loginContainer}>
      <div className={Css.loginCard}>
        <div className={Css.logo}>
          {/* Можно вставить изображение или иконку */}
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
            onChange={(e)=>setEmail(e.target.value)}
            />
          <input 
          type="password"
           placeholder="Password"
            className={Css.inputField}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
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
            <button className={Css.facebookButton}>Facebook</button>
            <button className={Css.googleButton} onClick={handleGoogleLogin}>Google</button>
          </div>
        </div>
        <p className={Css.signuplink}>
          No have an account? <a href="#">Create one account</a>
        </p>
      </div>
    </div>
  )
}

export default Auth
