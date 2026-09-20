

import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export type PaymentMode  =
  | "COD"
  | "CREDIT CARD"
  | "DEBIT CARD"
  | "UPI";

export interface IOrder extends Omit<Document, "_id"> {
  _id: string;
  orderId: string;
  customerId: string;
  orderDate: Date;
  paymentMode: PaymentMode;
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    _id: {
      type: String,
      default: () => uuidv4()
    },

    // Human-readable/business order number
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    // Reference to User
    customerId: {
      type: String,
      ref: "User",
      required: true,
    },

    orderDate: {
      type: Date,
      default: Date.now,
    },

    paymentMode: {
      type: String,
      enum: ["COD", "CREDIT CARD", "DEBIT CARD", "UPI"],
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model<IOrder>("Order", orderSchema);