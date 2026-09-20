
import { Router } from "express";

import {
  searchOrderValidation,
  orderIdValidation,
} from "../validations/order.validation";

import { validate } from "../middleware/validate.middleware";

import {
  searchOrders,
  getOrderById,
} from "../controller/order.controller";

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

export default router;