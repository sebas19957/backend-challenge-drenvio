import express from "express";
import { specialPriceController } from "../controllers/specialPriceController";

const router = express.Router();

/**
 * @route GET /api/special-prices/:id
 * @description Get all special prices for a specific id
 * @access Public
 */
router.get("/:id", specialPriceController.getSpecialPricesById);

/**
 * @route GET /api/special-prices
 * @description Get all special prices with special prices
 * @access Public
 */
router.get("/", specialPriceController.getAllSpecialPrices);

/**
 * @route POST /api/special-prices
 * @description Create a new special price entry
 * @access Public
 */
router.post("/", specialPriceController.createSpecialPrice);

/**
 * @route PUT /api/special-prices/add-special-price
 * @description Create a new special price entry
 * @access Public
 */
router.put("/add-special-price", specialPriceController.addSpecialPrice);

/**
 * @route PUT /api/special-prices/:id
 * @description Update a special price entry
 * @access Public
 */
router.put("/:id", specialPriceController.updateSpecialPrice);

/**
 * @route DELETE /api/special-prices/:id
 * @description Delete a special price entry
 * @access Public
 */
router.delete("/:id", specialPriceController.deleteSpecialPriceById);

/**
 * @route DELETE /api/special-prices/delete-product-special-price
 * @description Delete a special price entry
 * @access Public
 */
router.delete(
  "/delete-product-special-price/:id",
  specialPriceController.deleteSpecialPriceByIdProduct
);

export default router;
