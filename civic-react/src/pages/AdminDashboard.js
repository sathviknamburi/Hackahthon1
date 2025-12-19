import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AdminDashboard = () => {
  const [issues, setIssues] = useState([]);
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await api.issues.getAllIssues(token);
      const data = await response.json();
      if (data.success) setIssues(data.issues);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await api.issues.updateStatus(id, status, token);
      const data = await response.json();
      if (data.success) fetchIssues();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.email}</p>
      <button onClick={() => { logout(); navigate('/login'); }}>Logout</button>
      
      <h2>All Issues</h2>
      {issues.map(issue => (
        <div key={issue._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{issue.title}</h3>
          <p>{issue.description}</p>
          <p>Location: {issue.location}</p>
          <p>Landmark: {issue.nearbyLandmark}</p>
          <p>Reporter: {issue.createdBy?.email}</p>
          <p>Status: {issue.status}</p>
          <select 
            value={issue.status} 
            onChange={(e) => updateStatus(issue._id, e.target.value)}
          >
            <option value="PENDING">PENDING</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;