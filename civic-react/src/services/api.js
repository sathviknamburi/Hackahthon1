const API_BASE = 'http://localhost:5000/api';

const api = {
  auth: {
    register: (data) => fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.email, password: data.password })
    }),
    login: (data) => fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  },
  issues: {
    report: (data, token) => fetch(`${API_BASE}/issues/report`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: data
    }),
    getActiveIssues: (token) => fetch(`${API_BASE}/issues/active`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }),
    getMyIssues: (token) => fetch(`${API_BASE}/issues/my-issues`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }),
    getAllIssues: (token, status = '') => {
      const url = status ? `${API_BASE}/issues/all?status=${status}` : `${API_BASE}/issues/all`;
      return fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    },
    updateStatus: (id, status, token) => fetch(`${API_BASE}/issues/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    })
  }
};

export default api;