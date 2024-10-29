// src/components/Hero.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Redireciona para a tela de login
  };

  return (
    <section className="bg-neutralBlack text-neutralWhite py-20 text-center">
      <h2 className="text-3xl font-extrabold mb-4 lg:text-5xl">Bem-vindo ao Raazz!</h2>
      <p className="text-sm mb-8 text-lightGray lg:text-lg">Seu hub de informações automotivas, onde entusiastas se encontram.</p>
      <button
        onClick={handleLoginClick}
        className="px-6 py-3 lg:px-12 lg:py-3 border-white border-2 bg-black text-white font-semibold rounded-sm hover:bg-white hover:text-black hover:shadow-2xl transition-all duration-300"
      >
        Entrar
      </button>
    </section>
  );
}

export default Hero;
