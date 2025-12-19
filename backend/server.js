const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/issues', require('./routes/issues'));

// MongoDB connection
let isMongoConnected = false;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/civic-app')
  .then(() => {
    console.log('MongoDB connected successfully');
    isMongoConnected = true;
  })
  .catch(err => {
    console.log('MongoDB connection error:', err.message);
    console.log('Starting server without MongoDB connection...');
    console.log('Please start MongoDB or use MongoDB Atlas for full functionality');
    isMongoConnected = false;
  });

// Add MongoDB status endpoint
app.get('/api/status', (req, res) => {
  res.json({ 
    server: 'running',
    mongodb: isMongoConnected ? 'connected' : 'disconnected'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});