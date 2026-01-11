// Route/Students.js
const express = require("express");
const router = express.Router();

const Student = require("../Model/Students");
const Room = require("../Model/Rooms");

// CREATE STUDENT (Admission)
router.post("/create-student", async (req, res) => {
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
      room: roomId,
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
    const students = await Student.find().populate("room");
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// GET SINGLE STUDENT
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("room");

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
    const { name, phone, status, roomNo } = req.body;

    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    const newRoom = await Room.findOne({ roomNo: roomNo });
    if (!newRoom) return res.status(404).json({ error: "Room not found" });

    // If room changed
    if (newRoom._id.toString() !== student.room.toString()) {
      const oldRoom = await Room.findById(student.room);
      try {
        if (oldRoom.occupied <= 0) {
          return res.status(500).json({ error: "Old room occupancy invalid" });
        }
        await Room.findByIdAndUpdate(oldRoom._id, { $inc: { occupied: -1 } });
        await Room.findByIdAndUpdate(newRoom._id, { $inc: { occupied: 1 } });
        if(newRoom.occupied === newRoom.capacity)
        {
          await newRoom.updateOne({ status: "Full" });
        }
        if(oldRoom.occupied - 1 < oldRoom.capacity)
        {
          await oldRoom.updateOne({ status: "Available" });
        }
        if (newRoom.occupied >= newRoom.capacity)
        return res.status(400).json({ error: "Room is full" });
      } catch (err) {
        return res.status(500).json({ error: "Room update failed" });
      }
      student.room = newRoom._id;
    } else {
      student.room = student.room;
    }
    student.name = name;
    student.phone = phone;
    student.status = status;

    await student.save();

    res.json({ message: "Student updated", student });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
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
