import { Product } from "../models/Product";

export const productRepository = {
  /**
   * Get all products
   */
  getAllProducts: async () => {
    return Product.find();
  },

  /**
   * Get a product by id
   */
  getProductById: async (id: string) => {
    return Product.findById(id);
  },
};
