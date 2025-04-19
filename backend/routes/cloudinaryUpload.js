const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up multer to store files temporarily
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Route to handle file upload
router.post('/', upload.single('file'), async (req, res) => {
  try {
    // Check if file exists in the request
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });

    res.json({
      secure_url: result.secure_url,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'File upload failed' });
  }
});

module.exports = router;
