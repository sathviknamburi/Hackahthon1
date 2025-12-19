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
    { path: '/', label: 'Home' },
    { path: '/admin/issues', label: 'Manage Issues' }
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="language-switcher" onMouseLeave={() => setShowLangDropdown(false)}>
            <button 
              className="language-btn" 
              onMouseEnter={() => setShowLangDropdown(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <span>{currentLang}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9"/>
              </svg>
            </button>
            {showLangDropdown && (
              <div className="language-dropdown">
                {languages.map((lang) => (
                  <button 
                    key={lang.code}
                    className="language-option" 
                    onClick={() => handleLanguageChange(lang)}
                  >
                    <span className="lang-flag">{lang.flag}</span>
                    <span className="lang-name">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <div className="user-section">
            <span className="username-display">{user.username}</span>
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