// src/components/Hero.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Hero() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate('/feed'); // Redireciona para o feed se o usuário estiver logado
    }
  }, [currentUser, navigate]);

  const handleLoginClick = () => {
    navigate('/login'); // Redireciona para a tela de login
  };

  return (
    <div className="w-full bg-gradient-to-b from-black to-gray-900">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4 lg:text-5xl">Bem-vindo ao Raazz!</h2>
          <p className="text-sm mb-8 text-lightGray lg:text-lg">Seu hub de informações automotivas, onde entusiastas se encontram.</p>
          <button
            onClick={handleLoginClick}
            className="px-6 py-3 lg:px-12 lg:py-3 border-white border-2 bg-black text-white font-semibold rounded-sm hover:bg-white hover:text-black hover:shadow-2xl transition-all duration-300"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
