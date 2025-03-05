import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import productRoutes from "./routes/productRoutes";
import specialPriceRoutes from "./routes/specialPriceRoutes";
import connectDB from "./config/db";
import logger from "./config/logger";

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/special-prices", specialPriceRoutes);

// Health check route
app.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "OK", message: "✅ Server is up and running" });
});

// Handle 404 routes
app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: "❌ Route not found" });
});

// Error handling middleware
app.use(errorHandler);

export default app;
