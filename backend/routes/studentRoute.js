// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const Student = require('../models/studentSchema');

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

module.exports = router;