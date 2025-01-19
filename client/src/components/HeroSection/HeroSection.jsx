import React from 'react';
import './HeroSection.css';
import { assets } from "../../assets/assets";
const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Order your <br /><span>favourite Burger</span></h1>
        <p>
          Fresh and tasty Customized Burger.
        </p>
      </div>
      <div className="hero-image">
        <img src={assets.burger} alt='Delicious BURGR'/>
      </div>
    </section>
  );
}

export default HeroSection;
