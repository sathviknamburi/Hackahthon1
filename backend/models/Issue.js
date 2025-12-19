const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  issue_id: { type: String, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  nearbyLandmark: { type: String },
  image: { type: String },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Open', 'In Progress', 'Resolved', 'Closed'], default: 'Open' }
}, { timestamps: true });

issueSchema.pre('save', async function(next) {
  if (!this.issue_id) {
    const count = await mongoose.model('Issue').countDocuments();
    this.issue_id = `ISS-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Issue', issueSchema);