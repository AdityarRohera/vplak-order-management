

import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Every POST/PUT/PATCH here expects JSON. Without the right header the
  // body is never parsed, and validation would wrongly report empty fields.
  const methodsWithBody = ["POST", "PUT", "PATCH"];

  if (methodsWithBody.includes(req.method) && !req.is("application/json")) {
    return res.status(400).json({
      success: false,
      message:
        "Send raw JSON and set header Content-Type: application/json",
    });
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((error: any) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  next();
};