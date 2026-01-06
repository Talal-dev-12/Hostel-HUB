// models/Student.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  SID: {
    type: String,
    required: true,
    unique: true // STU001
  },

  name: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["Active", "Inactive", "Pending"],
    default: "Active"
  },

  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
