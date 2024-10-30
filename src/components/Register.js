// src/components/Register.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      alert('Usuário registrado com sucesso!');
      navigate('/login'); // Redireciona para login após registro
    } catch (error) {
      alert('Erro no registro: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4 max-w-md">
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
        Registrar
      </button>
    </form>
  );
}

export default Register;
