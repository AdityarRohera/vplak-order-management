import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export interface IProduct extends Omit<Document, "_id"> {
  _id: string;
  name: string;
  model?: string;
  sku: string;
  image?: string;
  price: number;
  categoryId?: string;
  stock: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema<IProduct>(
  {
    _id: {
      type: String,
      default: () => uuidv4()
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      trim: true,
      default: "",
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    categoryId: {
      type: String,
      ref: "Category",
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = model<IProduct>("Product", productSchema);