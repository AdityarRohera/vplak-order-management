

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from './config/db'
import {
  notFoundMiddleware,
  errorMiddleware,
} from "./middleware/error.middleware";



// Routes


// Global variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/todos", todoRoutes);
// app.use("/api/admin", adminRoutes);


// 404 handler
app.use(notFoundMiddleware);

// Error handler - keep this LAST
app.use(errorMiddleware);

// Start server
(async function startServer(){
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error : unknown) {
        if (error instanceof Error) {
            console.error("❌ App failed to start:", error.message);
        } else {
            console.error("❌ App failed to start:", error);
        }

    process.exit(1);
  }
})()