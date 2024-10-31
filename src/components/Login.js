// src/components/Login.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login, loginWithGoogle, currentUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (currentUser) {
      navigate('/feed'); // Se o usuário estiver logado, redireciona para o feed
    }
  }, [currentUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      alert('Erro no login: ' + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      alert('Erro no login com Google: ' + error.message);
    }
  };

  const handleRegister = () => {
    navigate('/Register');
  };

  return (
    <div className="w-full bg-gradient-to-b from-black to-gray-900">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-black/80 p-8 rounded-xl shadow-xl border border-gray-800">
          <h2 className="text-4xl font-bold mb-6 text-white">Login</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-md">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2 border rounded-sm"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-2 border rounded-sm"
            />
            <button type="submit" className="px-6 py-3 bg-white text-black font-semibold rounded-sm hover:bg-blue-600 hover:text-white">
              Entrar
            </button>
            <button
            onClick={handleGoogleLogin}
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-sm hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Entrar com Google
          </button>
          <button
            onClick={handleRegister}
            className="px-6 py-3 bg-black text-white border-white border-2 font-semibold rounded-sm hover:bg-green-400 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Registrar-se
          </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
