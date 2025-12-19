const axios = require('axios');

const API = process.env.API_URL || 'http://localhost:5000/api';

async function run() {
  try {
    console.log('1) Ensuring test user exists...');
    await axios.post(`${API}/auth/register`, {
      username: 'testuser_nocoords',
      password: 'password123'
    }).catch(() => {});

    console.log('2) Logging in as user...');
    const loginRes = await axios.post(`${API}/auth/login`, {
      username: 'testuser_nocoords',
      password: 'password123'
    });

    const userToken = loginRes.data.token;
    console.log('  user token length:', userToken?.length || 0);

    console.log('3) Creating an issue WITHOUT coordinates as user...');
    const createRes = await axios.post(
      `${API}/issues`,
      {
        title: 'Integration test issue (no coords)',
        category: 'other',
        description: 'Created by integration test without coordinates',
        address: '456 Test Ave',
        name: 'NoCoords User',
        email: 'nocoords@example.com',
        phone: '0001112222',
        severity: 'medium'
      },
      { headers: { Authorization: `Bearer ${userToken}` } }
    );

    const issue = createRes.data;
    console.log('  Created issue id:', issue._id);
    console.log('  Created issue location:', issue.location);

    console.log('4) Logging in as admin...');
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const adminLoginRes = await axios.post(`${API}/auth/login`, {
      username: adminUsername,
      password: adminPassword,
      isAdmin: true
    });

    const adminToken = adminLoginRes.data.token;
    console.log('  admin token length:', adminToken?.length || 0);

    console.log('5) Updating issue status to resolved as admin...');
    const updateRes = await axios.patch(
      `${API}/issues/${issue._id}/status`,
      { status: 'resolved' },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    console.log('  Update response status:', updateRes.status);
    console.log('  Issue new status:', updateRes.data.status);

    console.log('Integration test (no coords) completed successfully.');
  } catch (err) {
    if (err.response) {
      console.error('Request failed:', err.response.status, err.response.data);
    } else {
      console.error('Error:', err.message);
    }
    process.exitCode = 1;
  }
}

run();
