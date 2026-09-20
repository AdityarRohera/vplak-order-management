import { Request, Response, NextFunction } from "express";

import {
  searchOrders as searchOrdersService,
  getOrderById as getOrderByIdService,
//   createOrder as createOrderService,
} from "../services/order.service"

// export const createOrder = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const result = await createOrderService(req.body);

//     res.status(201).json({
//       success: true,
//       message: "Order created successfully",
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const searchOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { by, value } = req.query;

    const orders = await searchOrdersService(
      by as string,
      value as string
    );

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await getOrderByIdService(
      req.params.orderId as string
    );

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};