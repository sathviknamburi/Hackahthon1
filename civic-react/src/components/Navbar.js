import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.modern-navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.style.background = 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 50%, rgba(71, 85, 105, 0.95) 100%)';
        } else {
          navbar.style.background = 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!user) {
    return null;
  }

  const navItems = user.role === 'admin' ? [
    { path: '/admin/issues', label: 'View Issues' },
    { path: '/admin/manage', label: 'Manage Issues' }
  ] : [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/report', label: 'Report Issue' },
    { path: '/issues', label: 'View Issues' },
    { path: '/contact', label: 'Contact' }
  ];

  const languages = [
    { code: 'en', flag: '🇺🇸', name: 'English', short: 'EN' },
    { code: 'hi', flag: '🇮🇳', name: 'हिंदी', short: 'हि' },
    { code: 'te', flag: '🇮🇳', name: 'తెలుగు', short: 'తె' }
  ];

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang.short);
    setShowLangDropdown(false);
  };

  return (
    <nav className="modern-navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 10c0 6-1 8-8 8s-8-2-8-8 1-8 8-8 8 2 8 8z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <span className="logo-text">Civic Report</span>
        </Link>

        <div className="navbar-nav">
          {navItems.map((item) => (
            <div key={item.path} className="nav-item">
              <Link 
                to={item.path} 
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>

        <div className="navbar-actions">
          <div className="user-section">
            <span className="username-display">👤 {user.username}</span>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>

          <button 
            className={`mobile-menu-btn ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </button>
        </div>
      </div>

      <div className={`mobile-nav ${isOpen ? 'active' : ''}`}>
        {navItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path} 
            className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        
        <div className="mobile-language-section">
          <div className="mobile-lang-title">Language</div>
          {languages.map((lang) => (
            <button 
              key={lang.code}
              className="mobile-lang-option" 
              onClick={() => handleLanguageChange(lang)}
            >
              <span className="lang-flag">{lang.flag}</span>
              <span className="lang-name">{lang.name}</span>
            </button>
          ))}
        </div>
        

      </div>
    </nav>
  );
};

export default Navbar;