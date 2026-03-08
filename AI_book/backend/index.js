import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
 //import connectDB from "./config/db.js";
import AuthRouter from "./routes/authRoutes.js";
import BookRouter from "./routes/bookRoutes.js";
 import AiRouter from "./routes/aiRoutes.js";
import ExportRouter from "./routes/exportRoutes.js"
import mongoose from "mongoose";
dotenv.config();

const app = express();

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Connected successfully"))
  .catch(err => console.log("❌ FULL ERROR:", err));

// Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//routes
app.use("/api/auth",AuthRouter);
app.use("/api/books",BookRouter);
app.use("/api/ai",AiRouter);
app.use("/api/export",ExportRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
