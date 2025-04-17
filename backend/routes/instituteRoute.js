const express = require("express");
const router = express.Router();
const Institute = require("../models/instituteSchema");
const verifyFirebaseToken = require("../middleware/verifyFirebaseToken");

router.post("/", async (req, res) => {
  try {
    const {
      instituteName,
      instituteAddress,
      email,
      contact,
      owner,
      firebaseUid,
      studentCount,
    } = req.body;

    const existingInstitute = await Institute.findOne({ email });
    if (existingInstitute) {
      return res.status(400).json({ message: "Institute already registered with this email." });
    }

    const newInstitute = new Institute({
      instituteName,
      instituteAddress,
      email,
      contact,
      owner,
      firebaseUid,
      studentCount,
    });

    await newInstitute.save();
    res.status(201).json({ message: "Institute registered successfully!" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
});


// GET route to fetch the owner name of the institute
router.get("/login", verifyFirebaseToken, async (req, res) => {
  try {
    const uid = req.user.uid;

    const institute = await Institute.findOne({ firebaseUid: uid });

    if (!institute) {
      return res.status(404).json({
        success: false,
        message: "Institute not found",
      });
    }

    res.json({
      success: true,
      institute,
    });
  } catch (error) {
    console.error("Error fetching institute:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
