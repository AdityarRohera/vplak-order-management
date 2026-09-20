
import { Request, Response, NextFunction } from "express";

import {
  updateOrderItemStatus as updateOrderItemStatusService,
} from "../services/order-item.service";

export const updateOrderItemStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = req.body;

    const item = await updateOrderItemStatusService(
      req.params.itemId as string,
      status
    );

    res.status(200).json({
      success: true,
      message: "Order item status updated successfully",
      data: item,
    });
  } catch (error) {
    next(error);
  }
};