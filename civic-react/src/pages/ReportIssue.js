import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    nearbyLandmark: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await api.issues.report(formData, token);
      const data = await response.json();
      
      if (data.success) {
        setSuccess(true);
        setFormData({ title: '', description: '', category: '', location: '', nearbyLandmark: '' });
        setTimeout(() => {
          navigate('/my-issues');
        }, 2000);
      }
    } catch (error) {
      console.error('Error reporting issue:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (success) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2 style={{ color: '#28a745' }}>Issue Reported Successfully!</h2>
        <p>Your issue has been submitted and will be reviewed by our team.</p>
        <p>Redirecting to My Issues...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Report an Issue</h1>
      <p>Help improve your community by reporting civic issues.</p>
      
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '8px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Issue Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Brief description of the issue"
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '4px', 
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '4px', 
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          >
            <option value="">Select a category</option>
            <option value="Road">Road & Transportation</option>
            <option value="Water">Water & Drainage</option>
            <option value="Electricity">Electricity & Power</option>
            <option value="Waste Management">Waste Management</option>
            <option value="Public Safety">Public Safety</option>
            <option value="Parks & Recreation">Parks & Recreation</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Provide detailed information about the issue"
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '4px', 
              border: '1px solid #ddd',
              fontSize: '16px',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Street address or area name"
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '4px', 
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nearby Landmark</label>
          <input
            type="text"
            name="nearbyLandmark"
            value={formData.nearbyLandmark}
            onChange={handleChange}
            placeholder="Any nearby landmark to help locate the issue"
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '4px', 
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              flex: 1
            }}
          >
            {loading ? 'Submitting...' : 'Submit Issue'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/my-issues')}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportIssue;