const mongoose = require("mongoose");
require("dotenv").config();

console.log("Testing MongoDB connection...");
console.log(
  "Connection string:",
  process.env.MONGODB_URI.replace(
    /mongodb\+srv:\/\/[^:]+:[^@]+@/,
    "mongodb+srv://username:password@"
  )
);

mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("✅ SUCCESS: MongoDB Connected!");
    process.exit(0);
  })
  .catch((err) => {
    console.log("❌ ERROR:", err.message);
    console.log("Please check:");
    console.log("1. Network Access in MongoDB Atlas");
    console.log("2. Database user password");
    console.log("3. Connection string format");
    process.exit(1);
  });
