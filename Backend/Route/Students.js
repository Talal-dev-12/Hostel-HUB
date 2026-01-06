// Route/Students.js
const express = require("express");
const router = express.Router();

const Student = require("../Model/Students");
const Room = require("../Model/Rooms");

// CREATE STUDENT (Admission)
router.post("/", async (req, res) => {
  try {
    const { SID, name, phone, status, roomId } = req.body;

    // 1. Check room
    const room = await Room.findById(roomId);
    if (!room || room.status === "Full") {
      return res.status(400).json({ error: "Room not available" });
    }

    // 2. Create student
    const student = await Student.create({
      SID,
      name,
      phone,
      status,
      room: roomId
    });

    // 3. Update room occupancy
    room.occupied += 1;
    room.status = room.occupied === room.capacity ? "Full" : "Available";
    await room.save();

    res.status(201).json(student);

  } catch (error) {
    res.status(500).json({ error: "Failed to create student" });
  }
});


// LIST STUDENTS
router.get("/", async (req, res) => {
  try {
    const students = await Student.find()
      .populate("room", "roomNo type");

    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});


// GET SINGLE STUDENT
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("room");

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student" });
  }
});



// UPDATE STUDENT
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: "Failed to update student" });
  }
});


// DELETE STUDENT
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const room = await Room.findById(student.room);
    if (room) {
      room.occupied -= 1;
      room.status = "Available";
      await room.save();
    }

    await student.deleteOne();
    res.json({ message: "Student removed successfully" });

  } catch (error) {
    res.status(500).json({ error: "Failed to delete student" });
  }
});

module.exports = router;