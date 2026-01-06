// models/Payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  paymentCode: {
    type: String,
    unique: true
  },

  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  month: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["Paid", "Pending"],
    default: "Pending"
  },

  paidAt: {
    type: Date
  }
});

module.exports = mongoose.model("Payment", paymentSchema);
