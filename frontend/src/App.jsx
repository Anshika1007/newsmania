import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthProvider from "./contexts/AuthContext";


const App = () => {
  return (
    <AuthProvider>
      
        <Navbar />
        <div className="container mx-auto mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
          </Routes>
        </div>
      
    </AuthProvider>
  );
};

export default App;
