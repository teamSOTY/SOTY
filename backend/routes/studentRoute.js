// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const Student = require('../models/studentSchema');
const verifyFirebaseToken = require("../middleware/verifyFirebaseToken");

// Create new student
router.post('/', async (req, res) => {
  try {
    const studentData = req.body;
    
    // Convert dob string to Date object
    studentData.dob = new Date(studentData.dob);

    const student = new Student(studentData);
    await student.save();

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      data: student
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// PUT: Update student documents
router.put('/:id/documents', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          profilePhoto: req.body.profilePhoto,
          aadharCard: req.body.aadharCard,
          tenthMarksheet: req.body.tenthMarksheet,
          signature: req.body.signature,
         
        }
      },
      { new: true }
    );

    res.json({ success: true, data: updatedStudent });
  } catch (error) {
    console.error('Error updating documents:', error);
    res.status(500).json({ success: false, message: 'Failed to update documents' });
  }
});



// GET /api/student
router.get("/login", verifyFirebaseToken, async (req, res) => {
  try {
    const uid = req.user.uid;

    const student = await Student.findOne({ firebaseUid: uid });

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.json({ success: true, student });
  } catch (err) {
    console.error("Error fetching student:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router;