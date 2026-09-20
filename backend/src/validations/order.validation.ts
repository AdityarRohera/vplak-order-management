import { body, query, param } from "express-validator";

export const createOrderValidation = [
  body("customerId")
    .notEmpty()
    .withMessage("Customer ID is required"),

  body("paymentMode")
    .isIn(["cod", "Credit Card", "Debit Card", "UPI"])
    .withMessage("Invalid payment mode"),

  body("items")
    .isArray({ min: 1 })
    .withMessage("At least one order item is required"),

  body("items.*.productId")
    .notEmpty()
    .withMessage("Product ID is required"),

  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),

  body("items.*.discount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount must be a positive number"),

  body("items.*.deliveryCharges")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Delivery charges must be a positive number"),
];

export const searchOrderValidation = [
  query("by")
    .isIn(["orderId", "mobile", "name", "email"])
    .withMessage("Invalid search type"),

  query("value")
    .trim()
    .notEmpty()
    .withMessage("Search value is required"),
];

export const orderIdValidation = [
  param("orderId")
    .notEmpty()
    .withMessage("Order ID is required"),
];