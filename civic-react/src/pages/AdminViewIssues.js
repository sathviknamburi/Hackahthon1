import React, { useState, useEffect } from 'react';
import './AdminViewIssues.css';

const AdminViewIssues = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const savedIssues = localStorage.getItem('issues');
    if (savedIssues) {
      setIssues(JSON.parse(savedIssues));
    }
  }, []);

  const updateIssueStatus = (issueId, newStatus) => {
    const updatedIssues = issues.map(issue => 
      issue.id === issueId ? { ...issue, status: newStatus } : issue
    );
    setIssues(updatedIssues);
    localStorage.setItem('issues', JSON.stringify(updatedIssues));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'in-progress': return '#17a2b8';
      case 'resolved': return '#28a745';
      default: return '#6c757d';
    }
  };

  return (
    <div className="admin-view-issues">
      <h2>Admin - Manage Issues</h2>
      
      {issues.length === 0 ? (
        <p>No issues reported yet.</p>
      ) : (
        <div className="issues-grid">
          {issues.map((issue) => (
            <div key={issue.id} className="issue-card">
              <div className="issue-header">
                <h3>{issue.title}</h3>
                <span 
                  className="status-badge" 
                  style={{ backgroundColor: getStatusColor(issue.status) }}
                >
                  {issue.status}
                </span>
              </div>
              
              <div className="issue-details">
                <p><strong>Category:</strong> {issue.category}</p>
                <p><strong>Location:</strong> {issue.location}</p>
                <p><strong>Description:</strong> {issue.description}</p>
                <p><strong>Reported by:</strong> {issue.reportedBy}</p>
                <p><strong>Date:</strong> {new Date(issue.date).toLocaleDateString()}</p>
              </div>

              <div className="status-controls">
                <label>Update Status:</label>
                <select 
                  value={issue.status} 
                  onChange={(e) => updateIssueStatus(issue.id, e.target.value)}
                  className="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminViewIssues;