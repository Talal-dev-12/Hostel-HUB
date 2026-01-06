// Route/Payments.js
const express = require("express");
const router = express.Router();

const Payment = require("../Model/Payments");
const Student = require("../Model/Students");

// CREATE PAYMENT
router.post("/", async (req, res) => {
  try {
    const { paymentCode, studentId, amount, month } = req.body;

    // Verify student
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(400).json({ error: "Invalid student" });
    }

    const payment = await Payment.create({
      paymentCode,
      student: studentId,
      amount,
      month
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create payment" });
  }
});

// LIST PAYMENTS
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("student", "studentCode name")
      .sort({ month: -1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

// PAYMENTS BY STUDENT
router.get("/student/:id", async (req, res) => {
  try {
    const payments = await Payment.find({ student: req.params.id });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student payments" });
  }
});

// MARK PAYMENT AS PAID
router.put("/:id/pay", async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      {
        status: "Paid",
        paidAt: new Date()
      },
      { new: true }
    );

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update payment status" });
  }
});

// DEFUALTERS LIST
router.get("/defaulters", async (req, res) => {
  try {
    const defaulters = await Payment.find({ status: "Pending" })
      .populate("student", "studentCode name");

    res.json(defaulters);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch defaulters" });
  }
});

module.exports = router;