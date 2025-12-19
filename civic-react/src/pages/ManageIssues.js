import React, { useState, useEffect } from 'react';
import { issuesAPI } from '../services/api';
import './ManageIssues.css';

const ManageIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await issuesAPI.getAllIssues();
      setIssues(response.data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateIssueStatus = async (issueId, newStatus) => {
    try {
      await issuesAPI.updateIssueStatus(issueId, newStatus);
      setIssues(issues.map(issue => 
        issue._id === issueId ? { ...issue, status: newStatus } : issue
      ));
    } catch (error) {
      console.error('Error updating issue status:', error);
      alert('Failed to update issue status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#fbbf24';
      case 'in-progress': return '#3b82f6';
      case 'resolved': return '#10b981';
      default: return '#6b7280';
    }
  };

  const filteredIssues = issues.filter(issue => {
    if (filter === 'all') return true;
    return issue.status === filter;
  });

  return (
    <div className="manage-issues">
      <div className="manage-header">
        <h1>🛠️ Manage Issues</h1>
        <p>Update status of reported civic issues</p>
      </div>

      <div className="filter-section">
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({issues.length})
          </button>
          <button 
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Pending ({issues.filter(i => i.status === 'pending').length})
          </button>
          <button 
            className={filter === 'in-progress' ? 'active' : ''}
            onClick={() => setFilter('in-progress')}
          >
            In Progress ({issues.filter(i => i.status === 'in-progress').length})
          </button>
          <button 
            className={filter === 'resolved' ? 'active' : ''}
            onClick={() => setFilter('resolved')}
          >
            Resolved ({issues.filter(i => i.status === 'resolved').length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading issues...</div>
      ) : filteredIssues.length === 0 ? (
        <div className="no-issues">No issues found for the selected filter.</div>
      ) : (
        <div className="issues-list">
          {filteredIssues.map((issue) => (
            <div key={issue._id} className="issue-item">
              <div className="issue-info">
                <div className="issue-title">
                  <h3>{issue.title}</h3>
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(issue.status) }}
                  >
                    {issue.status.replace('-', ' ')}
                  </span>
                </div>
                
                <div className="issue-details">
                  <p><strong>📍 Location:</strong> {issue.location?.address}</p>
                  <p><strong>📂 Category:</strong> {issue.category}</p>
                  <p><strong>👤 Reported by:</strong> {issue.reportedBy?.username}</p>
                  <p><strong>📅 Date:</strong> {new Date(issue.createdAt).toLocaleDateString()}</p>
                  {issue.severity && <p><strong>⚠️ Severity:</strong> {issue.severity}</p>}
                </div>

                <div className="issue-description">
                  <p><strong>Description:</strong> {issue.description}</p>
                </div>
              </div>

              <div className="status-actions">
                <label>Update Status:</label>
                <div className="status-buttons">
                  <button 
                    className={issue.status === 'pending' ? 'active pending' : 'pending'}
                    onClick={() => updateIssueStatus(issue._id, 'pending')}
                  >
                    Pending
                  </button>
                  <button 
                    className={issue.status === 'in-progress' ? 'active in-progress' : 'in-progress'}
                    onClick={() => updateIssueStatus(issue._id, 'in-progress')}
                  >
                    In Progress
                  </button>
                  <button 
                    className={issue.status === 'resolved' ? 'active resolved' : 'resolved'}
                    onClick={() => updateIssueStatus(issue._id, 'resolved')}
                  >
                    Resolved
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageIssues;