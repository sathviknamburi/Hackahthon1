import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const MyIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyIssues();
  }, [token]);

  // Refresh issues when component becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchMyIssues();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const fetchMyIssues = async () => {
    try {
      setLoading(true);
      const response = await api.issues.getMyIssues(token);
      const data = await response.json();
      if (data.success) setIssues(data.issues);
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setLoading(false);
    }
  };



  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return '#ff6b6b';
      case 'In Progress': return '#4ecdc4';
      case 'Resolved': return '#45b7d1';
      case 'Closed': return '#96ceb4';
      default: return '#95a5a6';
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>My Issues</h1>
        <div>
          <button 
            onClick={() => navigate('/report')}
            style={{ 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '5px',
              marginRight: '10px',
              cursor: 'pointer'
            }}
          >
            Report New Issue
          </button>
          <button 
            onClick={() => { logout(); navigate('/login'); }}
            style={{ 
              backgroundColor: '#dc3545', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h3>Your Reported Issues ({issues.length})</h3>
          {issues.length === 0 ? (
            <p>No issues reported yet.</p>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {issues.map(issue => (
                <div key={issue._id} style={{ 
                  border: '1px solid #ddd', 
                  borderRadius: '8px', 
                  padding: '20px',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{issue.title}</h4>
                      <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>Issue ID: {issue.issue_id}</p>
                    </div>
                    <span style={{ 
                      backgroundColor: getStatusColor(issue.status), 
                      color: 'white', 
                      padding: '5px 10px', 
                      borderRadius: '15px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {issue.status}
                    </span>
                  </div>
                  <p style={{ marginBottom: '10px', color: '#555' }}>{issue.description}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px', color: '#666' }}>
                    <div><strong>Category:</strong> {issue.category}</div>
                    <div><strong>Location:</strong> {issue.location}</div>
                    {issue.nearbyLandmark && <div><strong>Landmark:</strong> {issue.nearbyLandmark}</div>}
                    {(issue.latitude && issue.longitude) && (
                      <div style={{ gridColumn: '1 / -1' }}>
                        <strong>GPS Location:</strong> {issue.latitude.toFixed(6)}, {issue.longitude.toFixed(6)}
                        <a 
                          href={`https://www.google.com/maps?q=${issue.latitude},${issue.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ marginLeft: '10px', color: '#007bff', textDecoration: 'none' }}
                        >
                          📍 View on Map
                        </a>
                      </div>
                    )}
                    <div><strong>Created:</strong> {formatDate(issue.createdAt)}</div>
                    <div><strong>Updated:</strong> {formatDate(issue.updatedAt)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyIssues;