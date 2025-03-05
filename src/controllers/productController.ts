import { Request, Response, NextFunction } from "express";
import { productService } from "../services/productService";
import { ResponseHandler } from "../utils/response";

export const productController = {
  /**
   * Get all products
   * @route GET /api/products
   */
  getAllProducts: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Extract userId from query param (for the user selector functionality)
      const userId = req.query.userId as string;

      const products = await productService.getAllProducts(userId);
      ResponseHandler.success(res, products, "Products retrieved successfully");
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get a product by id
   * @route GET /api/products/:id
   */
  getProductById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.query.userId as string;

      const product = await productService.getProductById(id, userId);

      if (!product) {
        ResponseHandler.notFound(res, "Product not found");
      }

      ResponseHandler.success(res, product, "Product retrieved successfully");
    } catch (error) {
      next(error);
    }
  },
};
