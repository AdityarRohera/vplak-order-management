
import { Router } from "express";

import {
  searchOrderValidation,
  orderIdValidation,
  createOrderValidation
} from "../validations/order.validation";

import { validate } from "../middleware/validate.middleware";

import {
  searchOrders,
  getOrderById,
} from "../controller/order.controller";

import { createOrder } from "../controller/order.controller";

const router = Router();

router.get(
  "/search",
  searchOrderValidation,
  validate,
  searchOrders
);

router.get(
  "/:orderId",
  orderIdValidation,
  validate,
  getOrderById
);

router.post(
  "/",
  createOrderValidation,
  validate,
  createOrder
);

export default router;