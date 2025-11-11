const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Allow all origins for testing
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

console.log("MongoDB URI:", MONGODB_URI ? "Present" : "Missing");

mongoose
  .connect(MONGODB_URI || "mongodb://localhost:27017/test")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err.message));

// Simple item model
const Item = mongoose.model("Item", {
  name: String,
  description: String,
});

// GET all items
app.get("/api/items", async (req, res) => {
  try {
    console.log("GET /api/items called");
    const items = await Item.find();
    console.log("Found items:", items.length);
    res.json(items);
  } catch (err) {
    console.log("GET error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST new item
app.post("/api/items", async (req, res) => {
  try {
    console.log("POST /api/items called with:", req.body);
    const item = new Item(req.body);
    await item.save();
    console.log("Item saved:", item);
    res.json(item);
  } catch (err) {
    console.log("POST error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Root route
app.get("/", (req, res) => {
  res.json({ message: "MERN Backend is running!" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
