// Database connection
require("./Connection/db.js");

const express = require("express");
const app = express();

app.use(express.json());
const cors = require("cors");
app.use(cors({
  origin: "http://localhost:8080",
  credentials: true,
}));

app.listen(process.env.PORT, () => {
  console.log("Server is running...");
})

// Student
const studentRoutes = require("./Route/Students");
app.use("/api/students", studentRoutes);

// Complaint
const complaintRoutes = require("./Route/Complaints");
app.use("/api/complaints", complaintRoutes);


// Payment
const paymentRoutes = require("./Route/Payments");
app.use("/api/payments", paymentRoutes);

// Room
const roomRoutes = require("./Route/Rooms");
app.use("/api/rooms", roomRoutes);

// Staff
const staffRoutes = require("./Route/Staff");
app.use("/api/staff", staffRoutes);

// Settings
const settingRoutes = require("./Route/Settings");
app.use("/api/settings", settingRoutes);
