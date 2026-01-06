const express = require("express");
const router = express.Router();
const Staff = require("../Model/Staff");

// CREATE STAFF
router.post("/", async (req, res) => {
  try {
    const staff = await Staff.create(req.body);
    res.status(201).json(staff);
  } catch (error) {
    res.status(500).json({ error: "Failed to create staff" });
  }
});

// LIST STAFF
router.get("/", async (req, res) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch staff" });
  }
});

// GET SINGLE STAFF
router.get("/:id", async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ error: "Staff not found" });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch staff" });
  }
});

// UPDATE STAFF
router.put("/:id", async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: "Failed to update staff" });
  }
});


// DELETE STAFF
router.delete("/:id", async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete staff" });
  }
});
module.exports = router;