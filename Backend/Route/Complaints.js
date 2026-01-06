// Route/Complaints.js
const express = require("express");
const router = express.Router();

const Complaint = require("../Model/Complaints");
const Student = require("../Model/Students");

// CREATE COMPLAINT
router.post("/", async (req, res) => {
  try {
    const { studentId, issue } = req.body;

    // 1. Verify student
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(400).json({ error: "Invalid student" });
    }

    // 2. Create complaint with auto room
    const complaint = await Complaint.create({
      student: student._id,
      room: student.room,
      issue
    });

    res.status(201).json(complaint);

  } catch (error) {
    res.status(500).json({ error: "Failed to create complaint" });
  }
});



// LIST COMPLAINTS
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("student", "studentCode name")
      .populate("room", "roomNo")
      .sort({ date: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
});



router.get("/:id", async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("student")
      .populate("room");

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch complaint" });
  }
});


router.put("/:id/status", async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.json({ message: "Complaint deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete complaint" });
  }
});

module.exports = router;
