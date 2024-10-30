// src/components/UserDropdown.js
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const UserDropdown = () => {
    const { currentUser, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Alterna a visibilidade do dropdown
    const toggleDropdown = () => setIsOpen((prev) => !prev);

    // Alterna a visibilidade do menu (para dispositivos móveis)
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    // Faz o logout do usuário
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Erro ao sair:', error);
        }
    };

    // Fecha o dropdown se o usuário clicar fora dele
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Se o usuário não estiver logado, não renderiza o componente
    if (!currentUser) {
        return null;
    }

    return (
        <div ref={dropdownRef} className="relative flex flex-row">
            {/* Imagem de perfil do usuário para abrir o dropdown */}
            <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
                <img
                    src={currentUser?.photoURL || "https://via.placeholder.com/40"}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                />
            </button>
            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 m-2 w-fit bg-black shadow-lg rounded-lg p-4 text-left">
                    <div className="flex justify-around items-center w-full gap-3 mb-4 px-10">
                        <img
                            src={currentUser?.photoURL || "https://via.placeholder.com/40"}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="flex flex-row w-fit">
                            <p className="font-bold">{currentUser?.displayName || "Usuário"}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 rounded-lg"
                    >
                        Sair
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;
