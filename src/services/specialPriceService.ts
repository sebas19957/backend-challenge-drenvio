import { specialPriceRepository } from "../repositories/specialPriceRepository";
import { productRepository } from "../repositories/productRepository";

export const specialPriceService = {
  /**
   * Obtener todos los usuarios con precios especiales
   */
  getAllSpecialPrices: async () => {
    return specialPriceRepository.getAllSpecialPrices();
  },

  /**
   * Obtener todos los precios especiales para un usuario específico
   */
  getSpecialPricesById: async (id: string) => {
    return specialPriceRepository.getSpecialPricesById(id);
  },

  /**
   * Crear o actualizar un precio especial para un usuario y producto
   */
  createSpecialPrice: async (
    name: string,
    email: string,
    productId: string,
    specialPrice: number
  ) => {
    // Verificar que el producto existe
    const productExists = await productRepository.getProductById(productId);
    if (!productExists) {
      throw new Error("Product not found");
    }

    // Obtener los precios especiales para este usuario
    return specialPriceRepository.createSpecialPrice(
      name,
      email,
      productId,
      specialPrice
    );
  },

  /**
   * Crear o actualizar un precio especial para un usuario y producto
   */
  addProductToSpecialPrice: async (
    id: string,
    productId: string,
    specialPrice: number
  ) => {
    // Obtener los precios especiales para este usuario
    return specialPriceRepository.addProductToSpecialPrice(
      id,
      productId,
      specialPrice
    );
  },

  /**
   * Actualizar un precio especial específico
   */
  updateSpecialPrice: async (
    id: string,
    productId: string,
    specialPrice: number
  ) => {
    return specialPriceRepository.updateSpecialPrice(
      id,
      productId,
      specialPrice
    );
  },

  /**
   * Eliminar un precio especial específico
   */
  deleteSpecialPriceById: async (id: string) => {
    return specialPriceRepository.deleteSpecialPrice(id);
  },

  /**
   * Eliminar un precio especial específico
   */
  deleteSpecialPriceByIdProduct: async (id: string, productId: string) => {
    return specialPriceRepository.deleteSpecialPriceByIdProduct(id, productId);
  },
};
