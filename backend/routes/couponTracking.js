const express = require('express');
const Coupon = require('../models/couponSchema'); // adjust path as needed
const Student = require('../models/studentSchema'); // adjust path as needed

const router = express.Router();

// GET /api/coupon-usage
router.get('/', async (req, res) => {
  try {
    const coupons = await Coupon.find().populate('usedBy', 'name email'); // assuming "usedBy" is an array of ObjectIds pointing to students
    res.json({ coupons });
  } catch (err) {
    console.error('Error fetching coupon usage:', err);
    res.status(500).json({ message: "Error fetching coupon usage" });
  }
});

module.exports = router;
