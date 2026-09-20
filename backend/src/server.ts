

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from './config/db'
import {
  notFoundMiddleware,
  errorMiddleware,
} from "./middleware/error.middleware";



// Routes
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import orderRoutes from "./routes/order.routes";
import orderItemRoutes from "./routes/order-item.routes";


// Global variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is running" });
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/order-items", orderItemRoutes);


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