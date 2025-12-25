const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
let uploadsDir;
if (process.env.LAMBDA_TASK_ROOT || process.env.NETLIFY) {
  // We are in a Lambda/Netlify environment
  uploadsDir = path.join('/tmp', 'uploads');
} else {
  uploadsDir = path.join(__dirname, '..', 'uploads');
}

if (!fs.existsSync(uploadsDir)) {
  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
  } catch (error) {
    console.error('Failed to create uploads directory:', error);
    // Fallback or just let it fail later
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter
});

module.exports = upload;