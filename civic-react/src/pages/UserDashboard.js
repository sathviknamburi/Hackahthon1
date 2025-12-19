import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Dashboard</h1>
      <p>Welcome, {user?.email}</p>
      <button onClick={() => navigate('/report')}>Report Issue</button>
      <button onClick={() => navigate('/issues')}>View My Issues</button>
      <button onClick={() => { logout(); navigate('/login'); }}>Logout</button>
    </div>
  );
};

export default UserDashboard;