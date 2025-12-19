import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (username, password, isAdmin = false) => {
    // Admin credentials (you can change these)
    const adminCredentials = {
      username: 'admin',
      password: 'admin123'
    };

    if (isAdmin) {
      if (username === adminCredentials.username && password === adminCredentials.password) {
        const adminUser = { username, role: 'admin' };
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        return { success: true };
      } else {
        return { success: false, message: 'Invalid admin credentials' };
      }
    } else {
      // For regular users, just check if username and password are provided
      if (username && password) {
        const regularUser = { username, role: 'user' };
        setUser(regularUser);
        localStorage.setItem('user', JSON.stringify(regularUser));
        return { success: true };
      } else {
        return { success: false, message: 'Please provide username and password' };
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};