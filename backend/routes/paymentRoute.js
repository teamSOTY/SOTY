const express = require("express");
const crypto = require("crypto");
const razorpay = require("../payment/razorpayInstance");
const Student = require("../models/studentSchema")
const Coupon = require("../models/couponSchema")

const router = express.Router();

// ------------------ Coupon Store ------------------
const staticCoupons = {
  SID50: { discount: 50, expiry: "2026-12-31" },// 🧪 Hardcoded test coupon
};

// ------------------ Prepare Payment (Secure Amount Calculation) ------------------
router.post("/prepare-payment", async (req, res) => {
  const { coupon, studentId } = req.body;
  const baseAmount = 199;
  let finalAmount = baseAmount;

  try {
    const today = new Date();

    // ✅ If coupon is provided
    if (coupon && typeof coupon === 'string' && coupon.trim() !== '') {
      // Static check
      if (staticCoupons[coupon]) {
        const staticData = staticCoupons[coupon];
        if (today <= new Date(staticData.expiry)) {
          finalAmount -= staticData.discount;
          return res.json({ success: true, amount: finalAmount, note: "Static coupon used" });
        }
      }

      // DB check
      const found = await Coupon.findOne({ code: coupon });
      if (found && today <= new Date(found.expiry)) {
        const alreadyUsed = found.usedBy.includes(studentId);

        if (found.usedBy.length >= 15 && !alreadyUsed) {
          return res.status(400).json({
            success: false,
            message: "Coupon usage limit reached (only 15 students allowed)",
          });
        }

        finalAmount -= found.discount;

        if (studentId && !alreadyUsed) {
          found.usedBy.push(studentId);
          await found.save();
        }

        return res.json({ success: true, amount: finalAmount, note: "DB coupon used" });
      }

      // ❌ Invalid/expired
      return res.status(400).json({ success: false, message: "Invalid or expired coupon" });
    }

    // ✅ No coupon provided at all
    return res.json({ success: true, amount: finalAmount, note: "No coupon used" });

  } catch (err) {
    console.error("Coupon error:", err);
    res.status(500).json({ success: false, message: "Internal error applying coupon" });
  }
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
router.post("/verify-payment",async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, studentId } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      if (studentId) {
        await Student.findByIdAndUpdate(studentId, {
          $set: {
            isPaymentDone: true,
            paymentId: razorpay_payment_id,
          },
        });
      }
      return res.status(200).json({ success: true, message: "✅ Payment verified successfully" });
    } else {
      return res.status(400).json({ success: false, message: "❌ Payment verification failed" });
    }
  } catch (err) {
    console.error("❌ Error in payment verification:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


module.exports = router;
