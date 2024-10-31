import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaPlus, FaUser, FaCar, FaSignOutAlt, FaChevronRight } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const BottomNav = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  if (!currentUser) return null;

  return (
    <>
      {isDropdownOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}

      {/* Barra de navegação lateral para telas grandes */}
      <aside 
        className={`hidden md:flex fixed left-0 top-0 bottom-0 bg-black/95 border-r border-gray-800 
          flex-col z-50 pt-24 transition-all duration-300 ease-in-out overflow-hidden
          hover:shadow-xl hover:shadow-black/20
          ${isExpanded ? 'w-64' : 'w-[4.5rem]'} hover:w-64 group`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="flex flex-col h-full relative px-3">
          {/* Perfil do usuário */}
          <div className={`flex items-center mb-6 py-3 border-b border-gray-800/50
            ${!isExpanded ? 'justify-center' : 'px-2'}`}>
            <img
              src={currentUser?.photoURL || 'https://via.placeholder.com/40'}
              alt="Profile"
              className="w-9 h-9 rounded-full border-2 border-green-500/50 flex-shrink-0
                transition-transform duration-300 group-hover:scale-110"
            />
            <div className={`flex-1 ml-3 transition-all duration-200 
              ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'} 
              group-hover:opacity-100 group-hover:w-auto`}>
              <p className="text-white font-medium truncate text-sm">
                {currentUser?.displayName || currentUser?.email}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {currentUser?.email}
              </p>
            </div>
          </div>

          {/* Links de navegação */}
          <div className="flex-1 flex flex-col space-y-1">
            <Link
              to="/feed"
              className={`flex items-center rounded-lg transition-all duration-200 whitespace-nowrap
                group/item
                ${location.pathname === '/feed'
                  ? 'bg-green-500/20 text-green-500'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                } ${!isExpanded ? 'justify-center p-3' : 'px-4 py-3'}`}
            >
              <FaHome className={`text-xl flex-shrink-0 transition-transform duration-200
                ${location.pathname === '/feed' ? 'scale-110' : 'group-hover/item:scale-110'}`} 
              />
              <span className={`transition-all duration-200 ml-3
                ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'} 
                group-hover:opacity-100 group-hover:w-auto`}>
                Feed
              </span>
            </Link>

            <Link
              to="/profile"
              className={`flex items-center rounded-lg transition-colors whitespace-nowrap
                ${location.pathname === '/profile'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                } ${!isExpanded ? 'justify-center p-3' : 'px-4 py-3'}`}
            >
              <FaUser className="text-xl flex-shrink-0" />
              <span className={`transition-all duration-200 ml-3
                ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'} 
                group-hover:opacity-100 group-hover:w-auto`}>
                Perfil
              </span>
            </Link>

            <Link
              to="/my-cars"
              className={`flex items-center rounded-lg transition-colors whitespace-nowrap
                ${location.pathname === '/my-cars'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                } ${!isExpanded ? 'justify-center p-3' : 'px-4 py-3'}`}
            >
              <FaCar className="text-xl flex-shrink-0" />
              <span className={`transition-all duration-200 ml-3
                ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'} 
                group-hover:opacity-100 group-hover:w-auto`}>
                Meus Carros
              </span>
            </Link>
          </div>

          {/* Área inferior com botões de ação */}
          <div className="mt-auto space-y-2 mb-4">
            <button
              onClick={() => navigate('/post')}
              className={`w-full bg-green-500/90 text-white rounded-lg hover:bg-green-400 
                transition-all duration-300 flex items-center whitespace-nowrap
                hover:shadow-lg hover:shadow-green-500/20 hover:scale-[1.02]
                ${!isExpanded ? 'justify-center p-3' : 'px-4 py-3'}`}
            >
              <FaPlus className={`flex-shrink-0 ${!isExpanded ? 'text-lg' : ''}`} />
              <span className={`transition-all duration-200 ml-3
                ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'} 
                group-hover:opacity-100 group-hover:w-auto`}>
                Criar Post
              </span>
            </button>

            <button
              onClick={handleLogout}
              className={`w-full flex items-center rounded-lg whitespace-nowrap
                text-gray-400 hover:bg-gray-800/50 hover:text-white transition-all duration-200
                ${!isExpanded ? 'justify-center p-3' : 'px-4 py-3'}`}
            >
              <FaSignOutAlt className="text-xl flex-shrink-0" />
              <span className={`transition-all duration-200 ml-3
                ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'} 
                group-hover:opacity-100 group-hover:w-auto`}>
                Sair
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Barra de navegação inferior para telas pequenas permanece igual */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur border-t border-gray-800 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-around items-center h-16">
            <Link
              to="/feed"
              className={`flex flex-col items-center text-sm ${
                location.pathname === '/feed'
                  ? 'text-green-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FaHome className="text-2xl mb-1" />
              <span>Home</span>
            </Link>

            <button
              onClick={() => navigate('/post')}
              className="bg-green-500 text-white p-4 rounded-full -mt-8 hover:bg-green-400 
                transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg shadow-green-500/20"
            >
              <FaPlus className="text-xl" />
            </button>

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex flex-col items-center text-sm text-gray-400 hover:text-white"
              >
                <img
                  src={currentUser?.photoURL || 'https://via.placeholder.com/32'}
                  alt="Perfil"
                  className="w-6 h-6 rounded-full mb-1"
                />
                <span>Perfil</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute bottom-full right-0 mb-2 w-48 bg-black/95 rounded-lg shadow-xl border border-gray-800 overflow-hidden">
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaUser className="mr-3" />
                      Perfil
                    </Link>
                    <Link
                      to="/my-cars"
                      className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaCar className="mr-3" />
                      Meus Carros
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-gray-800"
                    >
                      <FaSignOutAlt className="mr-3" />
                      Sair
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Espaçador para telas pequenas */}
      <div className="h-16 md:hidden" />
    </>
  );
};

export default BottomNav; 