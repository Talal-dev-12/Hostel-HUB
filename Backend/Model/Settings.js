// models/Setting.js
const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  hostelName: String,
  hostelAddress: String,
  contactNumber: String,
  roomTypes: [String]
});

module.exports = mongoose.model("Setting", settingSchema);
