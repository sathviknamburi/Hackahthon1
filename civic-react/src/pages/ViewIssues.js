import React, { useState, useEffect } from 'react';
import './ViewIssues.css';

const ViewIssues = () => {
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  useEffect(() => {
    const mockIssues = [
      {
        id: 1,
        title: "Large Pothole on Main Road",
        type: "pothole",
        description: "Deep pothole causing vehicle damage near the traffic signal",
        severity: "high",
        status: "in-progress",
        progress: 60,
        reportedBy: "John Doe",
        reportedDate: "2024-03-15",
        location: "Banjara Hills, Hyderabad",
        latitude: 17.4126,
        longitude: 78.4482,
        estimatedCompletion: "2024-03-25",
        assignedTo: "Road Maintenance Dept",
        updates: [
          { date: "2024-03-15", message: "Issue reported and verified" },
          { date: "2024-03-18", message: "Work order created and assigned" },
          { date: "2024-03-20", message: "Materials procured, work started" }
        ]
      },
      {
        id: 2,
        title: "Overflowing Garbage Bins",
        type: "garbage",
        description: "Garbage bins overflowing for past 3 days, creating hygiene issues",
        severity: "medium",
        status: "resolved",
        progress: 100,
        reportedBy: "Sarah Smith",
        reportedDate: "2024-03-10",
        location: "Jubilee Hills, Hyderabad",
        latitude: 17.4399,
        longitude: 78.4983,
        completedDate: "2024-03-13",
        assignedTo: "Waste Management Dept",
        updates: [
          { date: "2024-03-10", message: "Issue reported" },
          { date: "2024-03-11", message: "Cleaning crew dispatched" },
          { date: "2024-03-13", message: "Bins cleaned and additional bins installed" }
        ]
      },
      {
        id: 3,
        title: "Street Light Not Working",
        type: "streetlight",
        description: "Street light pole #45 not working, area is dark at night",
        severity: "medium",
        status: "pending",
        progress: 20,
        reportedBy: "Mike Johnson",
        reportedDate: "2024-03-18",
        location: "Gachibowli, Hyderabad",
        latitude: 17.4435,
        longitude: 78.3772,
        estimatedCompletion: "2024-03-28",
        assignedTo: "Electrical Dept",
        updates: [
          { date: "2024-03-18", message: "Issue reported and logged" },
          { date: "2024-03-19", message: "Technical assessment scheduled" }
        ]
      },
      {
        id: 4,
        title: "Blocked Drainage System",
        type: "drainage",
        description: "Water logging during rains due to blocked drainage",
        severity: "high",
        status: "in-progress",
        progress: 80,
        reportedBy: "Lisa Wilson",
        reportedDate: "2024-03-12",
        location: "Madhapur, Hyderabad",
        latitude: 17.4483,
        longitude: 78.3915,
        estimatedCompletion: "2024-03-22",
        assignedTo: "Drainage Dept",
        updates: [
          { date: "2024-03-12", message: "Issue reported" },
          { date: "2024-03-14", message: "Drainage cleaning started" },
          { date: "2024-03-16", message: "80% cleaning completed" },
          { date: "2024-03-20", message: "Final inspection pending" }
        ]
      }
    ];
    setIssues(mockIssues);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'in-progress': return '#3b82f6';
      case 'resolved': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      case 'critical': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const filteredIssues = issues.filter(issue => {
    const matchesFilter = filter === 'all' || issue.status === filter;
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="view-issues">
      <div className="container">
        <div className="issues-header">
          <h1>Reported Issues</h1>
          <p>Track the progress of civic issues reported by citizens</p>
        </div>

        <div className="filters">
          <div className="search-bar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search issues by title, location, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All Issues
            </button>
            <button 
              className={filter === 'pending' ? 'active' : ''}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button 
              className={filter === 'in-progress' ? 'active' : ''}
              onClick={() => setFilter('in-progress')}
            >
              In Progress
            </button>
            <button 
              className={filter === 'resolved' ? 'active' : ''}
              onClick={() => setFilter('resolved')}
            >
              Resolved
            </button>
          </div>
        </div>

        <div className="issues-grid">
          {filteredIssues.map(issue => (
            <div key={issue.id} className="issue-card">
              <div className="issue-header">
                <div className="issue-title">
                  <h3>{issue.title}</h3>
                  <div className="issue-meta">
                    <span className="issue-type">{issue.type}</span>
                    <span 
                      className="severity-badge"
                      style={{ backgroundColor: getSeverityColor(issue.severity) }}
                    >
                      {issue.severity}
                    </span>
                  </div>
                </div>
                <div 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(issue.status) }}
                >
                  {issue.status.replace('-', ' ')}
                </div>
              </div>

              <div className="issue-content">
                <p className="description">{issue.description}</p>
                
                <div className="issue-details">
                  <div className="detail-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{issue.location}</span>
                  </div>
                  <div className="detail-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                    <span>Reported: {new Date(issue.reportedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>By: {issue.reportedBy}</span>
                  </div>
                  <div className="detail-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    </svg>
                    <span>Assigned: {issue.assignedTo}</span>
                  </div>
                </div>

                <div className="coordinates">
                  <span>Lat: {issue.latitude}</span>
                  <span>Lng: {issue.longitude}</span>
                </div>
              </div>

              <div className="progress-section">
                <div className="progress-header">
                  <span>Progress</span>
                  <span>{issue.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${issue.progress}%`,
                      backgroundColor: getStatusColor(issue.status)
                    }}
                  ></div>
                </div>
                {issue.estimatedCompletion && issue.status !== 'resolved' && (
                  <div className="estimated-completion">
                    Expected completion: {new Date(issue.estimatedCompletion).toLocaleDateString()}
                  </div>
                )}
                {issue.completedDate && (
                  <div className="completed-date">
                    Completed on: {new Date(issue.completedDate).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="updates-section">
                <h4>Recent Updates</h4>
                <div className="updates-list">
                  {issue.updates.slice(-2).map((update, index) => (
                    <div key={index} className="update-item">
                      <div className="update-date">{new Date(update.date).toLocaleDateString()}</div>
                      <div className="update-message">{update.message}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <div className="no-issues">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <h3>No issues found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewIssues;