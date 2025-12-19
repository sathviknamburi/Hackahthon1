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
    nearbyLandmark: '',
    latitude: null,
    longitude: null
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await api.issues.report(formData, token);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess(true);
        setFormData({ title: '', description: '', category: '', location: '', nearbyLandmark: '', latitude: null, longitude: null });
        setTimeout(() => {
          navigate('/my-issues');
        }, 2000);
      } else {
        setError(data.message || 'Failed to submit issue');
      }
    } catch (error) {
      console.error('Error reporting issue:', error);
      setError('Network error. Please check your connection and try again.');
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

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      return;
    }

    setLocationLoading(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData(prev => ({ ...prev, latitude, longitude }));
        setLocationLoading(false);
      },
      (error) => {
        let errorMessage = 'Unable to retrieve location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        setLocationError(errorMessage);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const clearLocation = () => {
    setFormData(prev => ({ ...prev, latitude: null, longitude: null }));
    setLocationError('');
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
        {error && (
          <div style={{ 
            backgroundColor: '#f8d7da', 
            color: '#721c24', 
            padding: '12px', 
            borderRadius: '4px', 
            marginBottom: '20px',
            border: '1px solid #f5c6cb'
          }}>
            {error}
          </div>
        )}
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
            <option value="Pothole">Pothole</option>
            <option value="Garbager">Garbage</option>
            <option value="Street Light">Street Light</option>
            <option value="Drainage">Drainage</option>
            <option value="Stray animals causing danger">Stray animals causing danger</option>
            <option value="Water leakage">Water leakage</option>
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

        <div style={{ marginBottom: '20px' }}>
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

        <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '8px', border: '1px solid #b3d9ff' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>GPS Location (Optional)</label>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>Capture your current location to help authorities locate the issue more precisely.</p>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <button
              type="button"
              onClick={getCurrentLocation}
              disabled={locationLoading}
              style={{
                backgroundColor: locationLoading ? '#6c757d' : '#28a745',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: locationLoading ? 'not-allowed' : 'pointer',
                fontSize: '14px'
              }}
            >
              {locationLoading ? 'Getting Location...' : 'Use Current Location'}
            </button>
            
            {(formData.latitude || formData.longitude) && (
              <button
                type="button"
                onClick={clearLocation}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Clear Location
              </button>
            )}
          </div>

          {locationError && (
            <div style={{ color: '#dc3545', fontSize: '14px', marginBottom: '15px', padding: '10px', backgroundColor: '#f8d7da', borderRadius: '4px' }}>
              {locationError}
            </div>
          )}

          {(formData.latitude && formData.longitude) && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Latitude</label>
                <input
                  type="text"
                  value={formData.latitude.toFixed(6)}
                  readOnly
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    backgroundColor: '#f8f9fa',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Longitude</label>
                <input
                  type="text"
                  value={formData.longitude.toFixed(6)}
                  readOnly
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    backgroundColor: '#f8f9fa',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
          )}
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