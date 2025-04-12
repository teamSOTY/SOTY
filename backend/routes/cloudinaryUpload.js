// backend route (e.g., routes/upload.js)
const router = require('express').Router();
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

router.post('/cloudinaryUpload', async (req, res) => {
  try {
    const file = req.files.file;
    
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET
    });

    res.json({
      secure_url: result.secure_url
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'File upload failed' });
  }
});

module.exports = router;