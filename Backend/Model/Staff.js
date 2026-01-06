// models/Staff.js
const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  staffCode: {
    type: String,
    required: true,
    unique: true   // STF001, STF002
  },

  name: {
    type: String,
    required: true
  },

  position: {
    type: String,
    enum: ["Manager", "Receptionist", "Security", "Cleaner", "Maintenance"],
    required: true
  },

  contact: {
    type: String,
    required: true
  },

  shift: {
    type: String,
    enum: ["Day", "Night"],
    required: true
  },

  status: {
    type: String,
    enum: ["Active", "In-Active", "Leave"],
    default: "Active"
  }
}, { timestamps: true });

module.exports = mongoose.model("Staff", staffSchema);
