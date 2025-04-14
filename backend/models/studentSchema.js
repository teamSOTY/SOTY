const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  guardianMobile: { type: String, required: true },
  contactNo: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  houseNumber: { type: String, required: true },
  area: { type: String, required: true },
  landmark: { type: String, required: true },
  zipCode: { type: String, required: true },
  phone: { type: String, required: true },
  class: { type: String, required: true },
  lastClassPercentage: { type: String, required: true },
  schoolName: { type: String, required: true },
  firebaseUid: { type: String, required: true }, // Firebase UID field
  // Optional fields for document uploads (Cloudinary URLs)
  profilePicture: { type: String },
  marksheet: { type: String },
  signature: { type: String },
  aadharCard: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
