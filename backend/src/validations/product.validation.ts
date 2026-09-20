
import { body, param } from "express-validator";

export const createProductValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required"),

  body("model")
    .trim()
    .notEmpty()
    .withMessage("Product model is required"),

  body("sku")
    .trim()
    .notEmpty()
    .withMessage("SKU is required"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("categoryId")
    .notEmpty()
    .withMessage("Category ID is required"),

  body("stock")
    .isInt({ min: 0 })
    .withMessage("Stock cannot be negative"),
];

export const updateProductValidation = [
  param("id")
    .notEmpty()
    .withMessage("Product ID is required"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product name cannot be empty"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock cannot be negative"),
];