// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaCar, FaSignOutAlt } from 'react-icons/fa';

function Header() {
  const { currentUser, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <header className="bg-black text-white shadow-lg relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo e navegação principal */}
          <div className="flex justify-around items-center space-x-8">
            <Link to="/" className="text-xl font-bold">
              RAAZZ
            </Link>
            <nav className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
              <Link to="/cars" className="hover:text-blue-400 transition-colors">
                Carros
              </Link>
              <Link to="/feed" className="hover:text-blue-400 transition-colors">
                Feed
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
