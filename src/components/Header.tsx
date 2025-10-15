import React from 'react'
import './Header.css'

interface HeaderProps {
  cartItemCount: number
  onCartClick: () => void
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <img src="/logo.png" alt="Raj Saffron & Nuts" className="logo-image" />
          <div className="logo-text">
            <h1>Raj Saffron & Nuts</h1>
            <p className="tagline">Premium Quality Since Day One</p>
          </div>
        </div>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="cart-button" onClick={onCartClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 2L7 6H3L5 18h14l2-12h-4L15 2z"></path>
            <circle cx="9" cy="20" r="1"></circle>
            <circle cx="15" cy="20" r="1"></circle>
          </svg>
          <span className="cart-count">{cartItemCount}</span>
        </button>
      </div>
    </header>
  )
}

export default Header
