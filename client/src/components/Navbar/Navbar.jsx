import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/Registration');
  };

  const handleLogin = () => {
    navigate('/Login');
  };

  const handleMenu = () => {
    navigate('/Menu');
  };

  const handleCart = () => {
    navigate('/Cart');
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate('/Login');
  };

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  
  return (
    <nav className="navbar">
      <div className="logo">Burgrr</div>
      <ul className="nav-links">
        <li onClick={() => navigate('/')}>Home</li>
        <li onClick={handleMenu}>Menu</li>
        <li onClick={handleCart}>Cart</li>
      </ul>
      <div className="auth-buttons">
        {token ? (
          <>
          <span className="user-name">Welcome, {name}</span>
          <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={handleRegister}>Sign In</button>
            <button onClick={handleLogin}>Login</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
