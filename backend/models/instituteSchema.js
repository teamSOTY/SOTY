const mongoose = require('mongoose');

const instituteSchema = new mongoose.Schema({
  instituteName: { type: String,  },
  instituteAddress: { type: String,  },
  email: { type: String, }, // Firebase-authenticated email
  contact: { type: String,  },
  role: {
    type: String,
    default: "admin", 
  },
  owner: {
    firstName: { type: String,  },
    lastName: { type: String,  },
    email: { type: String,  }, // Same as above or a separate one
    phoneNumber: { type: String,  },
  },
  studentCount: { type: Number,  },
  firebaseUid: { type: String },

}, { timestamps: true });

const Institute = mongoose.model("Institute", instituteSchema);
module.exports = Institute;
