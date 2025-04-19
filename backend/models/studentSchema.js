const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String,  },
  lastName: { type: String,  },
  email: { type: String, },
  fatherName: { type: String,  },
  motherName: { type: String,  },
  guardianMobile: { type: String,  },
  contactNo: { type: String,  },
  dob: { type: Date,  },
  gender: { type: String,  },
  houseNumber: { type: String,  },
  area: { type: String,  },
  landmark: { type: String,  },
  zipCode: { type: String,  },
  phone: { type: String,  },
  class: { type: String,  },
  lastClassPercentage: { type: String,  },
  schoolName: { type: String,  },
  firebaseUid: { type: String,  }, // Firebase UID field
  // Optional fields for document uploads (Cloudinary URLs)
  profilePhoto: { type: String },
  tenthMarksheet: { type: String },
  signature: { type: String },
  aadharCard: { type: String },
  isPaymentDone: { type: Boolean, default: false },
  paymentId: String,
  createdAt: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
