import { productRepository } from "../repositories/productRepository";
import { specialPriceRepository } from "../repositories/specialPriceRepository";
import { Product } from "../models/Product";

export const productService = {
  /**
   * Get all products with special prices applied if userId is provided
   */
  getAllProducts: async (userId?: string): Promise<any[]> => {
    // Get all products
    const products = await productRepository.getAllProducts();

    // If no userId is provided, return regular products
    if (!userId) {
      return products;
    }

    // Get all special prices for this user
    const specialPrices =
      await specialPriceRepository.getSpecialPricesByIdGroup(userId);

    // Create a map for faster lookup
    const specialPriceMap = new Map();
    specialPrices.forEach((sp) => {
      specialPriceMap.set(sp.productId.toString(), sp.specialPrice);
    });

    // Apply special prices to products
    const productsWithSpecialPrices = products.map((product) => {
      const productId = product.id.toString();
      const specialPrice = specialPriceMap.get(productId);

      if (specialPrice) {
        return {
          ...product,
          originalPrice: product.price,
          price: specialPrice,
          hasSpecialPrice: true,
        };
      }

      return {
        ...product,
        hasSpecialPrice: false,
      };
    });

    return productsWithSpecialPrices;
  },

  /**
   * Get a product by id with special price applied if userId is provided
   */
  getProductById: async (id: string, userId?: string): Promise<any> => {
    const product = await productRepository.getProductById(id);

    if (!product || !userId) {
      return product;
    }

    return {
      ...product,
      hasSpecialPrice: false,
    };
  },

  /**
   * Get a product by id with special price applied if userId is provided
   */
  getProductByUser: async (id: string, userId?: string): Promise<any> => {
    const product = await productRepository.getProductById(id);

    if (!product || !userId) {
      return product;
    }

    // Check if user has special price for this product
    const specialPrice =
      await specialPriceRepository.getSpecialPricesByIdGroup(userId);

    if (specialPrice) {
      return {
        ...product,
        originalPrice: product.price,
        price: specialPrice,
        hasSpecialPrice: true,
      };
    }

    return {
      ...product,
      hasSpecialPrice: false,
    };
  },
};
