const mongoose = require('mongoose');

const instituteSchema = new mongoose.Schema({
  instituteName: { type: String, required: true },
  instituteAddress: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Firebase-authenticated email
  contact: { type: String, required: true },
  role: {
    type: String,
    default: "admin", 
  },
  owner: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Same as above or a separate one
    phoneNumber: { type: String, required: true },
  },
  studentCount: { type: Number, required: true },
}, { timestamps: true });

const Institute = mongoose.model("Institute", instituteSchema);
module.exports = Institute;
