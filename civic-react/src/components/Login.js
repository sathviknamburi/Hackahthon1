import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isSignUp && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const result = login(formData.username, formData.password, isAdmin);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        
        <div className="login-type-toggle">
          <button 
            type="button"
            className={!isAdmin ? 'active' : ''}
            onClick={() => setIsAdmin(false)}
          >
            User Login
          </button>
          <button 
            type="button"
            className={isAdmin ? 'active' : ''}
            onClick={() => setIsAdmin(true)}
          >
            Admin Login
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {isSignUp && !isAdmin && (
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        {!isAdmin && (
          <p className="toggle-form">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </span>
          </p>
        )}

        {isAdmin && (
          <div className="admin-info">
            <p>Admin credentials will be provided by the organizer</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;