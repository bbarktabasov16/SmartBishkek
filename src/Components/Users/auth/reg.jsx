import React, { useState } from 'react'
import Css from './auth.module.css'
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';  // Путь к вашему экземпляру Firestore
import Logo from '../../../images/Surreal_Digital_Landscape_Blending_Kyrgyz_Culture_And_Nature-removebg-preview.png'
import { auth, provider } from '../../../firebase';



function Reg() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');


    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
          // Создаем пользователя с помощью email и password
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
    
          // Добавляем данные пользователя в Firestore
          await setDoc(doc(db, 'users', user.uid), {
            name: name,
            email: email,
            tokens: 0,
            role: 'user',
            avatar: false,
            level: 0,
            achievements: []
          });
    
          setEmail('');
          setPassword('');
          setName('');
          setError('');
          navigate('/home'); // Перенаправляем на домашнюю страницу
    
        } catch (error) {
          setError(error.message); // Если произошла ошибка, выводим ее
        }
      };

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
                        {/* Можно вставить изображение или иконку */}
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
                            type="name"
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
                            onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit" className={Css.loginButton}>
                            Create
                        </button>
                    </form>
                    <div className={Css.socialLogin}>
                        <hr />
                        <p>or</p>
                        <div className={Css.socialButtons}>
                            <button className={Css.googleButton} onClick={handleGoogleLogin} >Google</button>
                        </div>
                    </div>
                    <p className={Css.signuplink}>
                        You have an account? <Link to={'/auth'}>SignUp</Link>
                    </p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Reg
