// Route/Settings.js
const express = require("express");
const router = express.Router();
const Setting = require("../Model/Settings");

// GET SETTINGS
router.get("/", async (req, res) => {
  try {
    let settings = await Setting.findOne();

    // Agar pehli dafa system chal raha hai
    if (!settings) {
      settings = await Setting.create({
        hostelName: "Hostel Hub",
        hostelAddress: "",
        contactNumber: "",
        roomTypes: ["Single", "Double", "Triple", "Deluxe"]
      });
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

// UPDATE SETTINGS
router.put("/", async (req, res) => {
  try {
    const settings = await Setting.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );

    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: "Failed to update settings" });
  }
});

module.exports = router;