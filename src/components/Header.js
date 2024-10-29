// src/components/Header.js
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-neutralBlack text-neutralWhite p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl sm:text-2xl font-bold text-center flex-1">Projeto Raazz</h1>
      
      {/* Ícone de hambúrguer */}
      <button
        className="lg:hidden focus:outline-none"
        onClick={toggleMenu}
      >
        <MenuIcon fontSize="large" />
      </button>

      {/* Menu de navegação */}
      <nav className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'} w-full lg:w-auto`}>
        <ul className={`flex flex-col lg:flex-row items-center ${isMenuOpen ? 'gap-6 mt-4' : ''} lg:mt-0 lg:gap-10`}>
          <li><a href="#home" className="hover:text-lightGray">Início</a></li>
          <li><a href="#cars" className="hover:text-lightGray">Carros</a></li>
          <li><a href="#about" className="hover:text-lightGray">Sobre</a></li>
          <li><a href="#contact" className="hover:text-lightGray">Contato</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
