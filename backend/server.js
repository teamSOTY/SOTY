// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS Options
const corsOptions = {
  origin: ["https://soty-jade.vercel.app/","http://localhost:5173/","https://soty-ten.vercel.app/"], // allow only your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // allow cookies if needed
};

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err));

// Routes
const paymentRoutes = require("./routes/paymentRoute");
const studentRoutes = require("./routes/studentRoute")
app.use("/api/payment", paymentRoutes);
app.use("/api/students",studentRoutes)

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 SOTY Backend Server is running");
});

app.listen(PORT, () => {
  console.log(`🟢 Server running at http://localhost:${PORT}`);
});
