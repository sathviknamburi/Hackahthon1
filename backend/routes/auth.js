const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const user = new User({ username, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password, isAdmin } = req.body;

    // Admin login
    if (isAdmin) {
      if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        let adminUser = await User.findOne({ username, role: 'admin' });
        
        if (!adminUser) {
          adminUser = new User({ username, password, role: 'admin' });
          await adminUser.save();
        }

        const token = jwt.sign({ userId: adminUser._id }, process.env.JWT_SECRET);
        
        return res.json({
          token,
          user: {
            id: adminUser._id,
            username: adminUser.username,
            role: adminUser.role
          }
        });
      } else {
        return res.status(401).json({ message: 'Invalid admin credentials' });
      }
    }

    // Regular user login
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;