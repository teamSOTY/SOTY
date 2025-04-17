const express = require('express');
const Coupon = require('../models/couponSchema');
const Student = require('../models/studentSchema');
const authenticateFirebaseUser = require('../middleware/verifyFirebaseToken'); // 👈 Middleware to verify Firebase token

const router = express.Router();

// GET /api/tracking - Only fetch coupons created by logged-in Firebase user
router.get('/', authenticateFirebaseUser, async (req, res) => {
  try {
    const firebaseUID = req.user.uid;

    const coupons = await Coupon.find({ createdBy: firebaseUID })
      .populate('usedBy', 'name email');

    res.json({ coupons });
  } catch (err) {
    console.error('Error fetching coupon usage:', err);
    res.status(500).json({ message: "Error fetching coupon usage" });
  }
});

module.exports = router;
