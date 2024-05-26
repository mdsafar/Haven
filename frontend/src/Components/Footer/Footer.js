import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer" >
      <div className="footer-container">
      <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" width="60" height="40">
                <text x="50%" y="40%" textAnchor="middle" alignmentBaseline="middle" fontFamily="Gabarito,sans-serif" fontSize="45" fill="#fff" fontWeight="bold">SH</text>
            </svg>
      </div>
      <div className="footer-section">
          <Link  to={'/'}>
            <span className="footer-link">Home</span>
          </Link>
        </div>
        <div className="footer-section">
          <Link  to={'/men'}>
            <span className="footer-link">Men</span>
          </Link>
        </div>
        <div className="footer-section">
          <Link  to={'/women'}>
            <span className="footer-link">Women</span>
          </Link>
        </div>
        <div className="footer-section">
          <Link  to={'/kids'}>
            <span className="footer-link">Kids</span>
          </Link>
        </div>
        <div className="footer-section">
          <Link  to={'/account'}>
            <span className="footer-link">Account</span>
          </Link>
        </div>
        <div className="footer-section">
          <Link  to={'/about'}>
            <span className="footer-link">About</span>
          </Link>
        </div>
        <div className="footer-section">
          <a href="https://instagram.com/iiamsafar">
            <span className="footer-link">Contact</span>
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        <span className="copyright-text">©{new Date().getFullYear()} <span>SoleHaven</span> by Safar</span>
      </div>
    </footer>
  );
};

export default Footer;

