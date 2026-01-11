const express = require("express");
const router = express.Router();
const Room = require("../Model/Rooms");

// ADD ROOM
router.post("/", async (req, res) => {
  try {
    const { roomNo, type, capacity } = req.body;

    const room = await Room.create({
      roomNo,
      type,
      capacity
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: "Failed to create room" });
  }
});


router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find().sort({ roomNo: 1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
});


router.get("/available", async (req, res) => {
  try {
    const rooms = await Room.find({ status: "Available" });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch available rooms" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });

    res.json(room);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch room" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(room);
  } catch (error) {
    res.status(500).json({ error: "Failed to update room" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: "Room deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete room" });
  }
});


router.get("/available", async (req, res) => {
  try {
    const rooms = await Room.find({occupied: {$lt: capacity}});
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

module.exports = router;