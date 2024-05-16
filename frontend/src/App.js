import React from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Singup from "./components/Singup/Singup";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import {PrivateRouteHome,PrivateRouteAdmin,PrivateRouteNewStatements,PrivateRouteYourStatements} from "./PrivateRoute";
import './App.css'
import { AuthProvider, useAuth } from "./authSession";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Singup />} />
            <Route path="/singup" element={<Register />} />
            <Route path="/newStatement" element={<PrivateRouteNewStatements />} />
            <Route path="/YourStatement" element={<PrivateRouteYourStatements />} />
            <Route path="/home" element={<PrivateRouteHome />} />
            <Route path="/admin" element={<PrivateRouteHome />} />
          </Routes>
        </Router>
      </AuthProvider>
      {/* <Home/> */}
    </div>
  );
}

export default App;
