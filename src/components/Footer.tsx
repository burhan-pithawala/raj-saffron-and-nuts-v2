import React from 'react'
import './Footer.css'

const Footer: React.FC = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Raj Saffron & Nuts</h3>
          <p>Your trusted source for premium saffron and finest quality nuts.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li>📧 info@rajsaffron.com</li>
            <li>📱 +971502978626</li>
            <li>📍 Dubai, UAE</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Check Us</h4>
          <div className="social-links">
            <a href="#facebook">Noon</a>
            <a href="https://www.instagram.com/rajsaffronnuts/">Instagram</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Raj Saffron & Nuts. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
