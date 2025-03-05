import { Request, Response, NextFunction } from "express";
import { specialPriceService } from "../services/specialPriceService";
import { ResponseHandler } from "../utils/response";
import mongoose from "mongoose";
import { productRepository } from "../repositories/productRepository";

export const specialPriceController = {
  /**
   * Obtener todos los usuarios con precios especiales
   * @route GET /api/special-prices
   */
  getAllSpecialPrices: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const users = await specialPriceService.getAllSpecialPrices();
      ResponseHandler.success(res, users, "Users retrieved successfully");
    } catch (error) {
      next(error);
    }
  },

  /**
   * Obtener todos los precios especiales para un usuario específico
   * @route GET /api/special-prices/:id
   */
  getSpecialPricesById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        ResponseHandler.badRequest(res, "User ID is required");
        return;
      }

      const specialPrices = await specialPriceService.getSpecialPricesById(id);

      if (!specialPrices) {
        ResponseHandler.notFound(res, "Special price not found");
      }

      ResponseHandler.success(
        res,
        specialPrices,
        "Special prices retrieved successfully"
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Crear o actualizar un precio especial
   * @route POST /api/special-prices
   */
  createSpecialPrice: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { name, email, productId, specialPrice } = req.body;

      // ✅ Validar si el ID es un ObjectId válido ANTES de hacer la consulta
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        ResponseHandler.badRequest(res, "productId, Invalid ID format");
      }

      // Validar campos requeridos
      if (!name || !email || !productId || !specialPrice) {
        ResponseHandler.badRequest(
          res,
          "name, email, productId, specialPrice are required"
        );
        return;
      }

      // Validar que el precio especial sea un número positivo
      if (typeof specialPrice !== "number" || specialPrice <= 0) {
        ResponseHandler.badRequest(
          res,
          "Special price must be a positive number"
        );
        return;
      }

      const newSpecialPrice = await specialPriceService.createSpecialPrice(
        name,
        email,
        productId,
        specialPrice
      );
      ResponseHandler.created(
        res,
        newSpecialPrice,
        "Special price created successfully"
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Agregar o actualizar un producto en la lista de precios especiales de un usuario
   * @route PUT /api/add-special-price
   */
  addSpecialPrice: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id, productId, specialPrice } = req.body;

      // Validar campos requeridos
      if (!id || !productId || !specialPrice) {
        ResponseHandler.badRequest(
          res,
          "id, product ID and special price are required"
        );
        return;
      }

      // Validar que el precio especial sea un número positivo
      if (typeof specialPrice !== "number" || specialPrice <= 0) {
        ResponseHandler.badRequest(
          res,
          "Special price must be a positive number"
        );
        return;
      }

      const IsSpecialPrice = await specialPriceService.getSpecialPricesById(id);

      const existProduct = await productRepository.getProductById(productId);

      if (!existProduct) {
        ResponseHandler.notFound(res, "Product not found");
        return;
      }

      if (!IsSpecialPrice) {
        ResponseHandler.badRequest(
          res,
          "User ID, No special price was found for the ID entered"
        );
        return;
      }

      // Verificar si el usuario ya tiene un registro de precios especiales
      const updatedSpecialPrice =
        await specialPriceService.addProductToSpecialPrice(
          id,
          productId,
          specialPrice
        );

      ResponseHandler.success(
        res,
        updatedSpecialPrice,
        "Special price updated successfully"
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Actualizar un precio especial
   * @route PUT /api/special-prices
   */
  updateSpecialPrice: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { productId, specialPrice } = req.body;

      if (!productId || !specialPrice) {
        ResponseHandler.badRequest(
          res,
          "productId and specialPrice are required"
        );
        return;
      }

      if (!id) {
        ResponseHandler.badRequest(
          res,
          "User ID is required from the parameter"
        );
        return;
      }

      if (
        !specialPrice ||
        typeof specialPrice !== "number" ||
        specialPrice <= 0
      ) {
        ResponseHandler.badRequest(res, "Valid special price is required");
        return;
      }

      const updatedSpecialPrice = await specialPriceService.updateSpecialPrice(
        id,
        productId,
        specialPrice
      );

      if (!updatedSpecialPrice) {
        ResponseHandler.notFound(res, "Special price not found");
        return;
      }

      ResponseHandler.success(
        res,
        updatedSpecialPrice,
        "Special price updated successfully"
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Eliminar un precio especial
   * @route DELETE /api/special-prices/:id
   */
  deleteSpecialPriceById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        ResponseHandler.badRequest(res, "id are required");
        return;
      }

      const result = await specialPriceService.deleteSpecialPriceById(id);

      if (!result) {
        ResponseHandler.notFound(res, "Special price not found");
        return;
      }

      ResponseHandler.success(res, null, "Special price deleted successfully");
    } catch (error) {
      next(error);
    }
  },

  /**
   * Eliminar un precio especial
   * @route DELETE /api/special-prices
   */
  deleteSpecialPriceByIdProduct: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { productId } = req.body;

      if (!id || !productId) {
        ResponseHandler.badRequest(res, "id, productId are required");
        return;
      }

      const result = await specialPriceService.deleteSpecialPriceByIdProduct(
        id,
        productId
      );

      if (!result) {
        ResponseHandler.notFound(res, "Special price not found");
        return;
      }

      ResponseHandler.success(res, null, "Special price deleted successfully");
    } catch (error) {
      next(error);
    }
  },
};
