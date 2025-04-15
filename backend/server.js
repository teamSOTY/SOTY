// server.js
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const admin = require("firebase-admin");

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


// Load Firebase credentials based on the environment
let firebaseConfig;

if (process.env.NODE_ENV === 'production') {
  // In production, read from the secret file
  firebaseConfig = JSON.parse(fs.readFileSync('/etc/secrets/firebase-service-account.json', 'utf8'));
} else {
  // In development, read from a local file
  firebaseConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'C:\Users\sidsh\Downloads\team-soty-firebase-adminsdk-fbsvc-8786d5f2c2.json'), 'utf8'));
}

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
})


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err));

// Routes
const paymentRoutes = require("./routes/paymentRoute");
const studentRoutes = require("./routes/studentRoute")
const instituteRoute = require("./routes/instituteRoute")
const couponRoute = require("./routes/couponRoute")
const trackingRoute = require("./routes/couponTracking")

app.use("/api/payment", paymentRoutes);
app.use("/api/students",studentRoutes)
app.use("/api/institute", instituteRoute)
app.use("/api/coupon", couponRoute)
app.use("/api/tracking", trackingRoute)

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 SOTY Backend Server is running");
});

app.listen(PORT, () => {
  console.log(`🟢 Server running at http://localhost:${PORT}`);
});
