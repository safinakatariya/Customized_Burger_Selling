import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import burgerRoute from "./routes/burgerRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    // credentials: true,
  })
);

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/user", userRoute);
app.use("/api/burgers", burgerRoute);

app.get("/", (req, res) => {
  res.send("API Working");
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
