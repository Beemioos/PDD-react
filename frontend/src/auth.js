import React from "react";
import Singup from "./components/Singup/Singup";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './authSession'; // Путь к вашему контексту аутентификации

function PrivateRoute({ element, ...props }) {
  const { user } = useAuth();

  return user ? element : <Navigate to="/" />;
}

function Auth() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Singup />} />
          <Route path="/singup" element={<Register />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/singup" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default Auth;

