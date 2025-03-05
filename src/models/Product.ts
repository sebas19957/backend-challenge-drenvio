import mongoose, { Schema, Document } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  price: number;
  category: string;
  brand: string;
  description: string;
  sku: string;
  stock: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String },
  description: { type: String },
  sku: { type: String },
  stock: { type: Number, default: 0 },
  tags: [{ type: String }],
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

export const Product = mongoose.model<ProductDocument>(
  "Product",
  ProductSchema,
  "productos"
);
