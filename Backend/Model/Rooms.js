const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNo: {
    type: String,
    required: true,
    unique: true
  },

  type: {
    type: String,
    enum: ["Single", "Double", "Triple", "Deluxe"],
    required: true
  },

  capacity: {
    type: Number,
    required: true,
    min: 1
  },

  occupied: {
    type: Number,
    default: 0,
    min: 0
  },

  status: {
    type: String,
    enum: ["Available", "Full"],
    default: "Available"
  }

}, { timestamps: true });

/**
 * Auto-update status before save
 */
roomSchema.pre("save", function (next) {
  this.status = this.occupied >= this.capacity ? "Full" : "Available";
  next();
});

module.exports = mongoose.model("Room", roomSchema);
