import { Order } from "../models/Order";
import { OrderItem } from "../models/OrderItem";
import { User } from "../models/User";

export const searchOrders = async (
  by: string,
  value: string
) => {
  let orders;

  // Search directly by orderId
  if (by === "orderId") {
    orders = await Order.find({
      orderId: value,
    });
  } else {
    let userQuery: any = {};

    if (by === "mobile") {
      userQuery.phone = value;
    }

    if (by === "name") {
      userQuery.name = {
        $regex: value,
        $options: "i",
      };
    }

    if (by === "email") {
      userQuery.email = value;
    }

    // Find matching users
    const users = await User.find(userQuery).select("_id");

    const customerIds = users.map((user) => user._id);

    // Find orders of those users
    orders = await Order.find({
      customerId: { $in: customerIds },
    });
  }

  const orderIds = orders.map((order) => order._id);

  // Join orders with users
  const result = await Order.aggregate([
    {
      $match: {
        _id: { $in: orderIds },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "customerId",
        foreignField: "_id",
        as: "customer",
      },
    },
    {
      $unwind: "$customer",
    },
    {
      $project: {
        orderId: 1,
        orderDate: 1,
        totalAmount: 1,
        status: 1,
        customerId: 1,

        customer: {
          name: "$customer.name",
          email: "$customer.email",
          phone: "$customer.phone",
          state: "$customer.state",
        },
      },
    },
    {
      $sort: {
        orderDate: -1,
      },
    },
  ]);

  return result;
};

export const getOrderById = async (orderId: string) => {
  const orders = await Order.aggregate([
    {
      $match: { orderId },
    },
    {
      $lookup: {
        from: "users",
        localField: "customerId",
        foreignField: "_id",
        as: "customer",
      },
    },
    {
      $unwind: "$customer",
    },
    {
      $project: {
        orderId: 1,
        orderDate: 1,
        status: 1,
        totalAmount: 1,

        customer: {
          name: "$customer.name",
          email: "$customer.email",
          phone: "$customer.phone",
          state: "$customer.state",
        },
      },
    },
  ]);

  if (orders.length === 0) {
    const error: any = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }

  const order = orders[0];

  const items = await OrderItem.aggregate([
    {
      $match: {
        orderId: order._id,
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
    {
      $project: {
        productId: 1,
        productName: 1,
        price: 1,
        quantity: 1,
        discount: 1,
        deliveryCharges: 1,
        status: 1,

        product: {
          name: "$product.name",
          model: "$product.model",
          image: "$product.image",
        },
      },
    },
  ]);

  return {
    order,
    items,
  };
};