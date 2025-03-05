import express from "express";
import { productController } from "../controllers/productController";

const router = express.Router();

/**
 * @route GET /api/products
 * @description Get all products
 * @access Public
 */
router.get("/", productController.getAllProducts);

/**
 * @route GET /api/products/:id
 * @description Get a product by id
 * @access Public
 */
router.get("/:id", productController.getProductById);

export default router;
