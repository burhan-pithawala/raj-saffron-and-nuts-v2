import React from 'react'
import './Hero.css'

const Hero: React.FC = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h2>Welcome to Raj Saffron & Nuts</h2>
        <p className="hero-subtitle">
          Experience the finest quality saffron and premium nuts
        </p>
        <p className="hero-description">
          We bring you authentic, hand-picked saffron and the freshest selection of nuts. 
          Perfect for your culinary adventures and healthy snacking.
        </p>
        <a href="#products" className="cta-button">
          Shop Now
        </a>
      </div>
      <div className="hero-image">
        <div className="hero-image-placeholder">
          🌸
        </div>
      </div>
    </section>
  )
}

export default Hero
