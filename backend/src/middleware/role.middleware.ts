
import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const requireRole = (role: "admin" | "customer") => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (req.user.role !== role) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };
};