// src/Components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Пока идет проверка состояния

  return user ? children : <Navigate to="/auth" replace />; // Если нет пользователя, перенаправляем на страницу входа
};

export default ProtectedRoute;
