
import { Router } from "express";

import { body, param } from "express-validator";

import { validate } from "../middleware/validate.middleware";

import { updateOrderItemStatus } from "../controller/order-item.controller";
import {updateStatusValidation} from "../validations/orderItem.validation"

const router = Router();


router.patch(
  "/:itemId/status",
  updateStatusValidation,
  validate,
  updateOrderItemStatus
);

export default router;