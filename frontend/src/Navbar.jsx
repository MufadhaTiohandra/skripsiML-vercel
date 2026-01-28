import React, { useState, useEffect } from 'react';
import './App.css'; // Kita pakai CSS global saja biar simpel

const Navbar = ({ activePage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  // Deteksi Scroll untuk efek Dinamis
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-logo" onClick={() => onNavigate('home')}>
        Skripsi<span style={{color: '#00d2ff'}}>AI</span> 🧠
      </div>

      <ul className="navbar-menu">
        <li 
          className={`nav-item ${activePage === 'home' ? 'active' : ''}`} 
          onClick={() => onNavigate('home')}
        >
          Home
        </li>
        <li 
          className={`nav-item ${activePage === 'about' ? 'active' : ''}`} 
          onClick={() => onNavigate('about')}
        >
          About
        </li>
        <li 
          className={`nav-item ${activePage === 'form' ? 'active' : ''}`}
          onClick={() => onNavigate('form')}
        >
          Self-Questionnaire
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;