const express = require("express");
const crypto = require("crypto");
const razorpay = require("../payment/razorpayInstance");

const router = express.Router();

// ------------------ Coupon Store ------------------
const coupons = {
  RANKINGEEK10: { discount: 10, expires: "2026-01-01" },
  DISCOUNT50: { discount: 50, expires: "2025-12-31" },
  SID50: { discount: 50, expires: "2025-12-31" },
};

// ------------------ Prepare Payment (Secure Amount Calculation) ------------------
router.post("/prepare-payment", (req, res) => {
  const { coupon } = req.body;

  const baseAmount = 199; // Could also be fetched from DB or based on product ID
  let finalAmount = baseAmount;

  const found = coupons[coupon];
  if (found) {
    const today = new Date();
    const expiry = new Date(found.expires);
    if (today <= expiry) {
      finalAmount -= found.discount;
    }
  }

  res.json({ success: true, amount: finalAmount });
});

// ------------------ Create Razorpay Order ------------------
router.post("/create-order", async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const options = {
      amount: amount * 100, // in paise
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    console.error("❌ Razorpay Order Error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// ------------------ Verify Razorpay Payment ------------------
router.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.status(200).json({ success: true, message: "✅ Payment verified successfully" });
  } else {
    res.status(400).json({ success: false, message: "❌ Payment verification failed" });
  }
});

module.exports = router;
