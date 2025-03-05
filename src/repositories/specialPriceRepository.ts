import { SpecialPrice } from "../models/SpecialPrice";
import mongoose from "mongoose";

export const specialPriceRepository = {
  /**
   * Crea un precio especial
   */
  createSpecialPrice: async (
    name: string,
    email: string,
    productId: string,
    specialPrice: number
  ) => {
    return await SpecialPrice.create({
      name,
      email,
      products: [
        {
          productId: new mongoose.Types.ObjectId(productId),
          specialPrice,
        },
      ],
    });
  },

  /**
   * Actualiza un precio especial para un usuario y producto
   */
  addProductToSpecialPrice: async (
    id: string,
    productId: string,
    specialPrice: number
  ) => {
    // Buscar si ya existe un documento para este usuario
    const existingSpecialPrice = await SpecialPrice.findOne({ _id: id });

    if (!existingSpecialPrice) {
      throw new Error(
        "No special price found for this user. Create one first."
      );
    }

    // Buscar si el producto ya existe en el array
    const productIndex = existingSpecialPrice.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex !== -1) {
      // Actualizar el precio especial existente
      existingSpecialPrice.products[productIndex].specialPrice = specialPrice;
    } else {
      // Agregar un nuevo producto al array
      existingSpecialPrice.products.push({
        productId: new mongoose.Types.ObjectId(productId),
        specialPrice,
      });
    }

    // Guardar los cambios
    return await existingSpecialPrice.save();
  },

  /**
   * Obtiene todos los usuarios con precios especiales
   */
  getAllSpecialPrices: async () => {
    const specialPrices = await SpecialPrice.find();
    return specialPrices;
  },

  /**
   * Obtiene todos los precios especiales para un usuario
   */
  getSpecialPricesByIdGroup: async (id: string) => {
    const specialPrice = await SpecialPrice.findOne({ _id: id });

    if (!specialPrice) {
      return [];
    }

    // Retornar los productos con sus precios especiales
    return specialPrice.products.map((product) => ({
      productId: product.productId,
      specialPrice: product.specialPrice,
    }));
  },

  /**
   * Obtiene todos los precios especiales para un usuario sin agrupar
   */
  getSpecialPricesById: async (id: string) => {
    const specialPrice = await SpecialPrice.findOne({ _id: id });

    // Retornar los productos con sus precios especiales
    return specialPrice;
  },

  /**
   * Actualiza un precio especial específico
   */
  updateSpecialPrice: async (
    id: string,
    productId: string,
    specialPrice: number
  ) => {
    const objectIdProduct = new mongoose.Types.ObjectId(productId); // Convertir productId

    const result = await SpecialPrice.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(id), // Convertir id a ObjectId
        "products.productId": objectIdProduct, // Buscar dentro del array
      },
      {
        $set: { "products.$.specialPrice": specialPrice }, // Actualizar solo ese campo
      },
      { new: true, runValidators: true } // Devolver el documento actualizado
    );

    return result;
  },

  /**
   * Elimina todos los precios especiales de un usuario
   */
  deleteSpecialPrice: async (id: string) => {
    const result = await SpecialPrice.deleteOne({
      _id: id,
    });

    return result.deletedCount > 0 ? result : null;
  },

  /**
   * Elimina un precio especial específico de un usuario y si era el último producto, elimina todo el registro
   */
  async deleteSpecialPriceByIdProduct(id: string, productId: string) {
    try {
      // Eliminar el producto específico del array de productos
      const result = await SpecialPrice.findByIdAndUpdate(
        id,
        {
          $pull: {
            products: { productId: productId },
          },
        },
        {
          new: true, // Devuelve el documento actualizado
          runValidators: true, // Ejecuta validaciones
        }
      );

      // Si no se encuentra el documento
      if (!result) {
        throw new Error("Special Price not found");
      }

      // Si después de eliminar el producto, no quedan más productos, eliminar todo el documento
      if (!result.products || result.products.length === 0) {
        await SpecialPrice.findByIdAndDelete(id);
      }

      return result;
    } catch (error) {
      console.error("Error deleting product from Special Price:", error);
      throw error;
    }
  },
};
