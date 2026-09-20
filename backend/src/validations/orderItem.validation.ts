
import { body, query, param } from "express-validator";


export const updateStatusValidation = [
  param("itemId")
    .notEmpty()
    .withMessage("Order item ID is required"),

  body("status")
    .isIn([
      "PENDING",
      "PROCESSING",
      "SHIPPED",
      "FULFILLED",
      "CANCELLED",
    ])
    .withMessage("Invalid order item status"),
];