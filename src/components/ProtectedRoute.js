// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    // Mostre um indicador de carregamento enquanto aguardamos a verificação de autenticação
    return <div>Carregando...</div>;
  }

  // Se não houver usuário autenticado, redirecione para o login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Caso o usuário esteja autenticado, renderize o componente filho
  return children;
};

export default ProtectedRoute;
