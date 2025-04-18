const express = require('express');
const Coupon = require('../models/couponSchema');
const router = express.Router();
const authenticateFirebaseUser = require('../middleware/verifyFirebaseToken');

// POST /api/coupon - Create a coupon (with Firebase UID)
router.post('/',authenticateFirebaseUser, async (req, res) => {
  try {
    const { code} = req.body;
    const firebaseUID = req.user?.uid;
    if (!code) return res.status(400).json({ message: "Coupon code is required" });

    if (!firebaseUID) {
      return res.status(401).json({ message: 'Unauthorized: Firebase UID missing' });
    }

    const existing = await Coupon.findOne({ code });
    if (existing) {
      return res.status(400).json({ message: 'Coupon code already exists' });
    }
     // Set the discount and expiry date here
     const discount = 50; // Fixed discount
     const expiryDate = new Date();
     expiryDate.setDate(expiryDate.getDate() + 4);

    const coupon = await Coupon.create({
      code,
      discount,
      expiry: expiryDate,
      usedBy: [],
      createdBy: firebaseUID, // 👈 Store the UID here
    });

    res.status(201).json({ coupon });
  } catch (err) {
    console.error('Coupon creation error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
