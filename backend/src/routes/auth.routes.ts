
import { Router } from "express";

import {
  registerValidation,
  loginValidation,
} from "../validations/auth.validation";

import { validate } from "../middleware/validate.middleware";

import { register , login } from "../controller/auth.controller";

const router = Router();

router.post(
  "/register",
  registerValidation,
  validate,
  register
);

router.post(
  "/login",
  loginValidation,
  validate,
  login
);

export default router;