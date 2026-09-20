

import { OrderItem } from "../models/OrderItem";

export const updateOrderItemStatus = async (
  itemId: string,
  status: string
) => {
  const item = await OrderItem.findByIdAndUpdate(
    itemId,
    { status },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!item) {
    const error: any = new Error("Order item not found");
    error.statusCode = 404;
    throw error;
  }

  return item;
};