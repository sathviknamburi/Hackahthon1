const axios = require('axios');

const API = process.env.API_URL || 'http://localhost:5000/api';

async function run() {
  try {
    console.log('1) Registering test user...');
    await axios.post(`${API}/auth/register`, {
      username: 'testuser_integ',
      password: 'password123'
    }).catch(() => {}); // ignore if already exists

    console.log('2) Logging in as user...');
    const loginRes = await axios.post(`${API}/auth/login`, {
      username: 'testuser_integ',
      password: 'password123'
    });

    const userToken = loginRes.data.token;
    console.log('  user token length:', userToken?.length || 0);

    console.log('3) Creating an issue as user...');
    const createRes = await axios.post(
      `${API}/issues`,
      {
        title: 'Integration test issue',
        category: 'other',
        description: 'Created by integration test',
        address: '123 Test St',
        latitude: 12.34,
        longitude: 56.78,
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        severity: 'low'
      },
      { headers: { Authorization: `Bearer ${userToken}` } }
    );

    const issue = createRes.data;
    console.log('  Created issue id:', issue._id);

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

    console.log('5) Updating issue status to in-progress as admin...');
    const updateRes = await axios.patch(
      `${API}/issues/${issue._id}/status`,
      { status: 'in-progress' },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    console.log('  Update response status:', updateRes.status);
    console.log('  Issue new status:', updateRes.data.status);

    console.log('Integration test completed successfully.');
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
