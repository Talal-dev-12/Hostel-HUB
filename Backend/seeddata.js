// const Complaint = require("./Model/Payments");
// const db = require("./Connection/db");
// const seedStudents = async () => {
//   try {
//     const dummyData = 
// [
//   {
//     "paymentCode": "PAY-2024-001",
//     "student": "65b1234567890abcdef11111",
//     "amount": 5000,
//     "month": "January",
//     "status": "Paid",
//     "paidAt": "2024-01-05T10:00:00Z"
//   },
//   {
//     "paymentCode": "PAY-2024-002",
//     "student": "65b1234567890abcdef22222",
//     "amount": 5000,
//     "month": "January",
//     "status": "Pending"
//   },
//   {
//     "paymentCode": "PAY-2024-003",
//     "student": "65b1234567890abcdef33333",
//     "amount": 5500,
//     "month": "February",
//     "status": "Paid",
//     "paidAt": "2024-02-02T11:30:00Z"
//   },
//   {
//     "paymentCode": "PAY-2024-004",
//     "student": "65b1234567890abcdef44444",
//     "amount": 4800,
//     "month": "February",
//     "status": "Pending"
//   },
//   {
//     "paymentCode": "PAY-2024-005",
//     "student": "65b1234567890abcdef55555",
//     "amount": 5000,
//     "month": "March",
//     "status": "Paid",
//     "paidAt": "2024-03-01T09:15:00Z"
//   }
// ]
//     await Complaint.insertMany(dummyData);
//     console.log("Data successfully seeded!");
//   } catch (error) {
//     console.error("Error seeding data:", error);
//   }   
// }
// seedStudents()