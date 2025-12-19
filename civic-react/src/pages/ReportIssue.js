import React, { useState } from 'react';
import './ReportIssue.css';

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    issueType: '',
    title: '',
    description: '',
    severity: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    landmark: '',
    image: null
  });
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(pos.coords.latitude.toFixed(6));
          setLongitude(pos.coords.longitude.toFixed(6));
        },
        () => {
          alert('Unable to get your location. Please enter coordinates manually.');
        }
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const user = JSON.parse(localStorage.getItem('user'));
    
    const newIssue = {
      id: Date.now(),
      title: formData.title,
      category: formData.issueType,
      location: formData.address,
      description: formData.description,
      severity: formData.severity,
      date: new Date().toISOString(),
      status: 'pending',
      reportedBy: user ? user.username : 'Anonymous',
      coordinates: { latitude, longitude },
      contactInfo: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      }
    };

    // Save to localStorage
    const existingIssues = JSON.parse(localStorage.getItem('issues') || '[]');
    existingIssues.push(newIssue);
    localStorage.setItem('issues', JSON.stringify(existingIssues));
    
    setTimeout(() => {
      alert('Issue reported successfully!');
      setIsSubmitting(false);
      // Reset form
      setFormData({
        issueType: '',
        title: '',
        description: '',
        severity: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        landmark: '',
        image: null
      });
      setLatitude('');
      setLongitude('');
    }, 2000);
  };

  return (
    <div className="report-issue">
      <div className="container">
        <div className="report-header">
          <h1>Report Civic Issue</h1>
          <p>Help us make your city better by reporting issues in your area</p>
        </div>

        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-grid">
            <div className="form-section">
              <h3>Issue Details</h3>
              
              <div className="form-group">
                <label>Issue Type *</label>
                <select 
                  name="issueType" 
                  value={formData.issueType} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Issue Type</option>
                  <option value="pothole">Pothole</option>
                  <option value="garbage">Garbage Collection</option>
                  <option value="streetlight">Street Light</option>
                  <option value="drainage">Drainage</option>
                  <option value="water">Water Supply</option>
                  <option value="traffic">Traffic Signal</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Issue Title *</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Brief title of the issue"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea 
                  name="description" 
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Detailed description of the issue"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Severity Level *</label>
                <select 
                  name="severity" 
                  value={formData.severity} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Severity</option>
                  <option value="low">Low - Minor inconvenience</option>
                  <option value="medium">Medium - Moderate impact</option>
                  <option value="high">High - Urgent attention needed</option>
                  <option value="critical">Critical - Emergency</option>
                </select>
              </div>

              <div className="form-group">
                <label>Upload Image</label>
                <input 
                  type="file" 
                  name="image" 
                  onChange={handleInputChange}
                  accept="image/*"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Contact Information</h3>
              
              <div className="form-group">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 9876543210"
                  required
                />
              </div>

              <div className="form-group">
                <label>Address *</label>
                <textarea 
                  name="address" 
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Complete address where the issue is located"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Nearby Landmark</label>
                <input 
                  type="text" 
                  name="landmark" 
                  value={formData.landmark}
                  onChange={handleInputChange}
                  placeholder="Any nearby landmark for easy identification"
                />
              </div>
            </div>
          </div>

          <div className="location-section">
            <h3>Location Coordinates</h3>
            <p>Provide the exact location coordinates of the issue</p>
            
            <div className="location-controls">
              <button 
                type="button" 
                className="location-btn"
                onClick={getCurrentLocation}
              >
                📍 Get Current Location
              </button>
            </div>

            <div className="coordinates-input">
              <div className="form-group">
                <label>Latitude *</label>
                <input 
                  type="number" 
                  step="any"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="17.385044"
                  required
                />
              </div>
              <div className="form-group">
                <label>Longitude *</label>
                <input 
                  type="number" 
                  step="any"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="78.486671"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;