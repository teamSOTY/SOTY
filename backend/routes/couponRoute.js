const express = require('express');
const Coupon = require('../models/couponSchema');
const router = express.Router();

// POST /api/coupon - Create a coupon
router.post('/', async (req, res) => {
  try {
    const { code, discount, expiry } = req.body;
    const existing = await Coupon.findOne({ code });
    if (existing) return res.status(400).json({ message: 'Coupon code already exists' });

    const coupon = await Coupon.create({ code, discount, expiry });
    res.status(201).json({ coupon });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
