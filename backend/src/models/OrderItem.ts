import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export type OrderItemStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "FULFILLED"
  | "CANCELLED";

export interface IOrderItem extends Omit<Document, "_id"> {
  _id: string;

  orderId: string;
  productId: string;

  // Product snapshot at purchase time
  productName: string;
  model?: string;
  image?: string;
  price: number;

  quantity: number;
  discount: number;
  deliveryCharges: number;

  status: OrderItemStatus;

  createdAt?: Date;
  updatedAt?: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    _id: {
      type: String,
      default: uuidv4(),
    },

    // Reference to Order
    orderId: {
      type: String,
      ref: "Order",
      required: true,
    },

    // Reference to Product
    productId: {
      type: String,
      ref: "Product",
      required: true,
    },

    // Snapshot fields
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    // Price when the order was placed
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    deliveryCharges: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "PROCESSING",
        "SHIPPED",
        "FULFILLED",
        "CANCELLED",
      ],

      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

// Useful for fetching all items belonging to an order
orderItemSchema.index({ orderId: 1, createdAt: -1 });

export const OrderItem = model<IOrderItem>(
  "OrderItem",
  orderItemSchema
);