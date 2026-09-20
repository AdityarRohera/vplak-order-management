
import { Router } from "express";

import { body, param } from "express-validator";

import { validate } from "../middleware/validate.middleware";

import { updateOrderItemStatus } from "../controller/order-item.controller";

const router = Router();

const updateStatusValidation = [
  param("itemId")
    .notEmpty()
    .withMessage("Order item ID is required"),

  body("status")
    .isIn([
      "pending",
      "processing",
      "shipped",
      "fulfilled",
      "cancelled",
    ])
    .withMessage("Invalid order item status"),
];

router.patch(
  "/:itemId/status",
  updateStatusValidation,
  validate,
  updateOrderItemStatus
);

export default router;