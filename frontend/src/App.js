import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import MySessions from './pages/MySessions';
import SessionEditor from './pages/SessionEditor';
import FeatureHub from './pages/FeatureHub';
import Navbar from './components/Navbar';

const App = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={
          isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={
          isLoggedIn ? <FeatureHub /> : <Navigate to="/login" />
        } />
        <Route path="/my-sessions" element={
          isLoggedIn ? <MySessions /> : <Navigate to="/login" />
        } />
        <Route path="/editor" element={
          isLoggedIn ? <SessionEditor /> : <Navigate to="/login" />
        } />
        <Route path="/real-dashboard" element={
          isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
        } />
      </Routes>
    </div>
  );
};

export default App;
