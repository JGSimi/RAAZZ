// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Hero from './components/Hero';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Feed from './components/Feed';
import CarModels from './components/CarModels';
import CreatePost from './components/CreatePost';
import Profile from './components/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-mono">
          <main className="flex-1 flex">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/feed" element={
                <ProtectedRoute>
                  <div className="w-full">
                    <Feed />
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
              <Route path="/cars" element={<ProtectedRoute><CarModels /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
