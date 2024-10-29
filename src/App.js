// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Login from './components/Login';
import Register from './components/Register';
import CarModels from './components/CarModels';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-neutralWhite min-h-screen flex flex-col font-mono">
          <Header />
          <main className="flex-grow bg-neutralBlack p-0 sm:p-0 md:p-12 lg:p-16 flex flex-col justify-center">
            <section className="flex justify-center w-full">
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/car-models" element={<ProtectedRoute><CarModels /></ProtectedRoute>} />
              </Routes>
            </section>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
