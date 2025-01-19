import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import HeroSection from "./components/HeroSection/HeroSection";

import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";

import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import Customizer from "./pages/Customizer/Customizer";
import Cart from "./pages/Cart/Cart";
import PayedPage from "./pages/Pay/Pay";  

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/Login" />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check user session on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    window.location.href = "/Login";
  };
  
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/HeroSection" element={<HeroSection />} />
          
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Customizer" element={<Customizer />} />
          <Route path ="/Cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/PayedPage" element={<PayedPage />} />

          <Route path="/Login" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
