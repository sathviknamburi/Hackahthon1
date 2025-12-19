const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Add logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// In-memory storage
let users = [
  {
    id: 1,
    username: 'testuser',
    password: 'test123',
    role: 'user'
  }
];
let issues = [];
let userIdCounter = 2;
let issueIdCounter = 1;

// Register
app.post('/api/auth/register', (req, res) => {
  try {
    const { username, password } = req.body;
    
    console.log('Registration attempt:', { username, password: password ? 'provided' : 'missing' });
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    
    if (users.find(u => u.username === username)) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    const user = {
      id: userIdCounter++,
      username,
      password,
      role: 'user'
    };
    
    users.push(user);
    console.log('User registered successfully:', user.username);
    
    res.status(201).json({
      token: 'fake-token-' + user.id,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { username, password, isAdmin } = req.body;
  
  if (isAdmin) {
    if (username === 'admin' && password === 'admin123') {
      return res.json({
        token: 'fake-admin-token',
        user: {
          id: 999,
          username: 'admin',
          role: 'admin'
        }
      });
    } else {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }
  }
  
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  res.json({
    token: 'fake-token-' + user.id,
    user: {
      id: user.id,
      username: user.username,
      role: user.role
    }
  });
});

// Create issue
app.post('/api/issues', (req, res) => {
  const issue = {
    _id: issueIdCounter++,
    ...req.body,
    status: 'pending',
    createdAt: new Date(),
    reportedBy: { username: 'testuser' }
  };
  
  issues.push(issue);
  res.status(201).json(issue);
});

// Get all issues
app.get('/api/issues', (req, res) => {
  res.json(issues);
});

// Update issue status
app.patch('/api/issues/:id/status', (req, res) => {
  const issue = issues.find(i => i._id == req.params.id);
  if (issue) {
    issue.status = req.body.status;
    res.json(issue);
  } else {
    res.status(404).json({ message: 'Issue not found' });
  }
});

app.listen(5000, () => {
  console.log('Simple server running on port 5000');
});