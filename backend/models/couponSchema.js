const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String,  },
  discount: { type: Number,  },
  expiry: { type: Date },
  usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Coupon', couponSchema);
