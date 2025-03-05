import mongoose, { Schema, Document } from "mongoose";

// Interfaz para el precio especial de un producto
export interface ProductSpecialPrice {
  productId: mongoose.Types.ObjectId;
  specialPrice: number;
}

// Documento principal de precios especiales por usuario
export interface SpecialPriceDocument extends Document {
  name: String;
  email: String;
  products: ProductSpecialPrice[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSpecialPriceSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  specialPrice: { type: Number, required: true },
});

const SpecialPriceSchema: Schema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    products: [ProductSpecialPriceSchema], // Array de productos con precios especiales
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const collectionName = process.env.SPECIAL_PRICES_COLLECTION;

export const SpecialPrice = mongoose.model<SpecialPriceDocument>(
  "SpecialPrice",
  SpecialPriceSchema,
  collectionName
);
