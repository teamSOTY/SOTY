const express = require("express");
const router = express.Router();
const Institute = require("../models/instituteSchema");

router.post("/", async (req, res) => {
  try {
    const {
      instituteName,
      instituteAddress,
      email,
      contact,
      owner,
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
router.get("/institute", async (req, res) => {
  try {
    // Assuming you are passing the institute ID in the query parameters
    const instituteId = req.query.instituteId;

    if (!instituteId) {
      return res.status(400).json({ message: "Institute ID is required." });
    }

    const institute = await Institute.findById(instituteId);

    if (!institute) {
      return res.status(404).json({ message: "Institute not found" });
    }

    // Send the owner name in the response
    res.json({ ownerName: institute.owner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching institute details" });
  }
});

module.exports = router;
