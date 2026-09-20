import { Router } from "express";

import {
  createProductValidation,
  updateProductValidation,
} from "../validations/product.validation";

import { validate } from "../middleware/validate.middleware";

import { createProduct , getProducts , getProductById , updateProduct , deleteProduct} from "../controller/product.controller";
import { authenticate } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  requireRole("admin"),
  createProductValidation,
  validate,
  createProduct
);

router.get(
  "/",
  getProducts
);

router.get(
  "/:id",
  getProductById
);

router.put(
  "/:id",
  updateProductValidation,
  validate,
  updateProduct
);

router.delete(
  "/:id",
  deleteProduct
);

export default router;