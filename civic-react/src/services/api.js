import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (username, password, isAdmin = false) =>
    api.post('/auth/login', { username, password, isAdmin }),
  
  register: (username, password) =>
    api.post('/auth/register', { username, password }),
};

// Issues API
export const issuesAPI = {
  createIssue: (issueData) => {
    const formData = new FormData();
    Object.keys(issueData).forEach(key => {
      if (issueData[key] !== null && issueData[key] !== undefined) {
        formData.append(key, issueData[key]);
      }
    });
    return api.post('/issues', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  getAllIssues: () => api.get('/issues'),
  
  getMyIssues: () => api.get('/issues/my-issues'),
  
  updateIssueStatus: (issueId, status) =>
    api.patch(`/issues/${issueId}/status`, { status }),
  
  deleteIssue: (issueId) => api.delete(`/issues/${issueId}`),
};

export default api;