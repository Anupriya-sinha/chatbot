import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import chatbotRoutes from "./routes/chatbot.route.js";

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

// middleware 
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",   // frontend origin
  methods: ["GET", "POST"],
  credentials: true
}));

const MONGO_URL = process.env.MONGO_URI;
//DB CODE

  try {
    mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }

  // Defining Routes
app.use("/bot/v1/", chatbotRoutes)  

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});

















