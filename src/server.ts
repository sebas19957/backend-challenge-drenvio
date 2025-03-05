import express from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
import cors from "cors";
import specialPriceRoutes from "./routes/specialPriceRoutes";
import productRoutes from "./routes/productRoutes";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/products", productRoutes);
app.use("/api/special-prices", specialPriceRoutes);

app.get("/", (req, res) => {
  res.send("✅ Servidor corriendo correctamente");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
