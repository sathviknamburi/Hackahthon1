import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AdminManageIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllIssues();
  }, []);

  const fetchAllIssues = async () => {
    try {
      setLoading(true);
      const response = await api.issues.getAllIssues(token);
      const data = await response.json();
      if (data.success) setIssues(data.issues);
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (issueId, newStatus) => {
    try {
      setUpdating(prev => ({ ...prev, [issueId]: true }));
      const response = await api.issues.updateStatus(issueId, newStatus, token);
      const data = await response.json();
      if (data.success) {
        setIssues(prev => prev.map(issue => 
          issue._id === issueId ? { ...issue, status: newStatus, updatedAt: new Date().toISOString() } : issue
        ));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdating(prev => ({ ...prev, [issueId]: false }));
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

  const statusOptions = ['Open', 'In Progress', 'Resolved', 'Closed'];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Manage Issues</h1>
        <div>
          <button 
            onClick={() => navigate('/admin/view-issues')}
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
            View Issues
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
          <h3>Manage Issue Status ({issues.length} issues)</h3>
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
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{issue.title}</h4>
                      <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>Issue ID: {issue.issue_id}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                      <select
                        value={issue.status}
                        onChange={(e) => updateStatus(issue._id, e.target.value)}
                        disabled={updating[issue._id]}
                        style={{ 
                          padding: '5px 10px', 
                          borderRadius: '4px', 
                          border: '1px solid #ddd',
                          backgroundColor: updating[issue._id] ? '#f8f9fa' : 'white',
                          cursor: updating[issue._id] ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                      {updating[issue._id] && (
                        <span style={{ fontSize: '12px', color: '#666' }}>Updating...</span>
                      )}
                    </div>
                  </div>
                  
                  <div style={{ 
                    backgroundColor: '#f8f9fa', 
                    padding: '15px', 
                    borderRadius: '6px', 
                    marginBottom: '15px' 
                  }}>
                    <h5 style={{ margin: '0 0 10px 0', color: '#333' }}>Description:</h5>
                    <p style={{ margin: '0', color: '#555', lineHeight: '1.5' }}>{issue.description}</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', fontSize: '14px', color: '#666' }}>
                    <div><strong>Category:</strong> {issue.category}</div>
                    <div><strong>Location:</strong> {issue.location}</div>
                    <div><strong>Reporter:</strong> {issue.user_id?.email}</div>
                    {issue.nearbyLandmark && <div><strong>Landmark:</strong> {issue.nearbyLandmark}</div>}
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

export default AdminManageIssues;