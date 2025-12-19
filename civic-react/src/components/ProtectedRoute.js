import React from 'react';
import { useAuth } from '../context/AuthContext';
import Login from './Login';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <div>Access denied. Admin privileges required.</div>;
  }

  return children;
};

export default ProtectedRoute;