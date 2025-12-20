const express = require('express');
const Issue = require('../models/Issue');
const { auth, adminOnly } = require('../middleware/auth');
const upload = require('../utils/upload');
const router = express.Router();

// Report Issue
router.post('/report', auth, upload.single('image'), async (req, res) => {
  try {
    const { latitude, longitude, ...otherData } = req.body;
    
    // Validate coordinates if provided
    if (latitude !== null && latitude !== undefined) {
      if (typeof Number(latitude) !== 'number' || Number(latitude) < -90 || Number(latitude) > 90) {
        return res.status(400).json({ success: false, message: 'Invalid latitude' });
      }
    }
    if (longitude !== null && longitude !== undefined) {
      if (typeof Number(longitude) !== 'number' || Number(longitude) < -180 || Number(longitude) > 180) {
        return res.status(400).json({ success: false, message: 'Invalid longitude' });
      }
    }
    
    console.log('Creating issue with data:', { ...otherData, latitude, longitude, status: 'Open', user_id: req.user.userId });
    
    const issue = new Issue({ 
      ...otherData, 
      latitude: latitude ? Number(latitude) : null,
      longitude: longitude ? Number(longitude) : null,
      image: req.file ? req.file.filename : null,
      status: 'Open',
      user_id: req.user.userId 
    });
    
    const savedIssue = await issue.save();
    await savedIssue.populate('user_id', 'email');
    
    console.log('Issue saved successfully:', savedIssue._id);
    res.status(201).json({ 
      success: true, 
      message: 'Issue reported successfully',
      issue: savedIssue 
    });
  } catch (error) {
    console.error('Error creating issue:', error);
    if (req.file) {
      const fs = require('fs');
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
});

// Get Issues by Logged-in User (for reporting history)
router.get('/my-issues', auth, async (req, res) => {
  try {
    const issues = await Issue.find({ user_id: req.user.userId })
      .populate('user_id', 'email')
      .sort({ createdAt: -1 });
    res.json({ success: true, issues });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get Active Issues for Users (Open and In Progress only)
router.get('/active', auth, async (req, res) => {
  try {
    console.log('Fetching active issues for user:', req.user.userId);
    const issues = await Issue.find({ 
      status: { $in: ['Open', 'In Progress'] }
    })
      .populate('user_id', 'email')
      .sort({ createdAt: -1 });
    console.log('Found active issues:', issues.length);
    res.json({ success: true, issues });
  } catch (error) {
    console.error('Error fetching active issues:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get All Issues (Admin only)
router.get('/all', auth, adminOnly, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const issues = await Issue.find(filter)
      .populate('user_id', 'email')
      .sort({ createdAt: -1 });
    res.json({ success: true, issues });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update Issue Status (Admin only)
router.patch('/:id/status', auth, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Open', 'In Progress', 'Resolved', 'Closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    const issue = await Issue.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    ).populate('user_id', 'email');
    if (!issue) {
      return res.status(404).json({ success: false, message: 'Issue not found' });
    }
    res.json({ success: true, issue });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;