const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/civic-report');
    
    const adminExists = await User.findOne({ email: 'admin@civic.com' });
    if (adminExists) {
      console.log('Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
      email: 'admin@civic.com',
      password: hashedPassword,
      role: 'ADMIN'
    });

    await admin.save();
    console.log('Admin created successfully');
    
    // Create test user
    const userExists = await User.findOne({ email: 'user@test.com' });
    if (!userExists) {
      const userPassword = await bcrypt.hash('user123', 10);
      const testUser = new User({
        email: 'user@test.com',
        password: userPassword,
        role: 'USER'
      });
      await testUser.save();
      console.log('Test user created successfully');
    }
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
};

createAdmin();