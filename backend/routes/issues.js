const express = require('express');
const multer = require('multer');
const path = require('path');
const Issue = require('../models/Issue');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Create issue
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const issueData = {
      ...req.body,
      reportedBy: req.user._id,
      location: {
        address: req.body.address,
        coordinates: {
          latitude: req.body.latitude,
          longitude: req.body.longitude
        }
      },
      contactInfo: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
      }
    };

    if (req.file) {
      issueData.image = req.file.filename;
    }

    const issue = new Issue(issueData);
    await issue.save();
    
    await issue.populate('reportedBy', 'username');
    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all issues
router.get('/', auth, async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate('reportedBy', 'username')
      .sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's issues
router.get('/my-issues', auth, async (req, res) => {
  try {
    const issues = await Issue.find({ reportedBy: req.user._id })
      .populate('reportedBy', 'username')
      .sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update issue status (Admin only)
router.patch('/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'in-progress', 'resolved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('reportedBy', 'username');

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete issue (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id);
    
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.json({ message: 'Issue deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;