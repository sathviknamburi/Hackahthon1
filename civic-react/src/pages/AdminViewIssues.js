import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AdminViewIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllIssues();
  }, [statusFilter, token]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchAllIssues = async () => {
    try {
      setLoading(true);
      const response = await api.issues.getAllIssues(token, statusFilter);
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

  const getStatusCounts = () => {
    const counts = { total: issues.length, Open: 0, 'In Progress': 0, Resolved: 0, Closed: 0 };
    issues.forEach(issue => {
      counts[issue.status] = (counts[issue.status] || 0) + 1;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>View All Issues</h1>
        <div>
          <button 
            onClick={() => navigate('/admin/manage-issues')}
            style={{ 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '5px',
              marginRight: '10px',
              cursor: 'pointer'
            }}
          >
            Manage Issues
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

      {/* Statistics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ margin: '0', color: '#333' }}>{statusCounts.total}</h3>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>Total Issues</p>
        </div>
        <div style={{ backgroundColor: '#fff5f5', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ margin: '0', color: '#ff6b6b' }}>{statusCounts.Open}</h3>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>Open</p>
        </div>
        <div style={{ backgroundColor: '#f0fdfa', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ margin: '0', color: '#4ecdc4' }}>{statusCounts['In Progress']}</h3>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>In Progress</p>
        </div>
        <div style={{ backgroundColor: '#eff6ff', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ margin: '0', color: '#45b7d1' }}>{statusCounts.Resolved}</h3>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>Resolved</p>
        </div>
        <div style={{ backgroundColor: '#f0fdf4', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ margin: '0', color: '#96ceb4' }}>{statusCounts.Closed}</h3>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>Closed</p>
        </div>
      </div>

      {/* Filter */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        >
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h3>Issues ({issues.length})</h3>
          {issues.length === 0 ? (
            <p>No issues found.</p>
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
                  <p style={{ marginBottom: '15px', color: '#555' }}>{issue.description}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', fontSize: '14px', color: '#666' }}>
                    <div><strong>Category:</strong> {issue.category}</div>
                    <div><strong>Location:</strong> {issue.location}</div>
                    <div><strong>Reporter:</strong> {issue.user_id?.email}</div>
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

export default AdminViewIssues;