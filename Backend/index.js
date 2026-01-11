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
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running... PORT :", port);
})

// Student
const studentRoutes = require("./Route/Students");
app.use("/students", studentRoutes);

// Complaint
const complaintRoutes = require("./Route/Complaints");
app.use("/complaints", complaintRoutes);


// Payment
const paymentRoutes = require("./Route/Payments");
app.use("/payments", paymentRoutes);

// Room
const roomRoutes = require("./Route/Rooms");
app.use("/rooms", roomRoutes);

// Staff
const staffRoutes = require("./Route/Staff");
app.use("/staff", staffRoutes);

// Settings
const settingRoutes = require("./Route/Settings");
app.use("/settings", settingRoutes);


