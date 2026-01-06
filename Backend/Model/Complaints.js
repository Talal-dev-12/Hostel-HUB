// models/Complaint.js
const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  complaintCode: {
    type: String,
    unique: true
  },

  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },

  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true
  },

  issue: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["Pending", "Resolved"],
    default: "Pending"
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Complaint", complaintSchema);
