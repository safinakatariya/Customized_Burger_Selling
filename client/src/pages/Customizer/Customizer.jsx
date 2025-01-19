import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Ingredients from "../../components/Ingredients/Ingredients";
import Footer from "../../components/Footer/Footer";
import { useLocation } from "react-router-dom";

const Customizer = () => {
  const location = useLocation();
  const { burger } = location.state;

  return (
    <div>
      <Navbar />
      <Ingredients initialBurger={burger} />
      <Footer />
    </div>
  );
};

export default Customizer;