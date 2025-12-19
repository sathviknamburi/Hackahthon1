import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setTimeout(() => setError(''), 3000);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.auth.login(formData);
      const data = await response.json();
      
      if (data.success) {
        if (isAdminLogin && data.user.role !== 'ADMIN') {
          setError('Access denied. Admin credentials required.');
          return;
        }
        
        login(data.user, data.token);
        navigate(data.user.role === 'ADMIN' ? '/admin/view-issues' : '/home');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome to Civic Report</h1>
          <p>Sign in to report and track civic issues in your community</p>
        </div>

        <div className="login-type-selector">
          <button 
            className={!isAdminLogin ? 'active' : ''}
            onClick={() => setIsAdminLogin(false)}
          >
            User Login
          </button>
          <button 
            className={isAdminLogin ? 'active' : ''}
            onClick={() => setIsAdminLogin(true)}
          >
            Admin Login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {location.state?.message && (
            <div className="success-message">{location.state.message}</div>
          )}
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder={isAdminLogin ? "Admin email" : "Enter your email"}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder={isAdminLogin ? "Admin password" : "Enter your password"}
            />
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Signing in...' : `Sign in as ${isAdminLogin ? 'Admin' : 'User'}`}
          </button>
        </form>

        {!isAdminLogin && (
          <div className="auth-footer">
            <p>Don't have an account? <Link to="/signup">Create one here</Link></p>
          </div>
        )}

        {isAdminLogin && (
          <div className="admin-info">
            <p><strong>Admin Access Only</strong></p>
            <p>Use provided admin credentials</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;