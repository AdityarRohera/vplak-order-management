import { Order, type PaymentMode } from "../models/Order";
import { OrderItem } from "../models/OrderItem";
import { User } from "../models/User";
import { Product } from "../models/Product";

export const searchOrders = async (
  by?: string,
  value?: string
) => {
  let orders;

  // No filter -> return all orders
  if (!by || !value) {
    orders = await Order.find({});
  }
  // Search directly by orderId
  else if (by === "orderId") {
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
      $lookup: {
        from: "orderitems",
        localField: "_id",
        foreignField: "orderId",
        as: "items",
      },
    },
    {
      $project: {
        orderId: 1,
        orderDate: 1,
        totalAmount: 1,
        paymentMode: 1,
        items: 1,
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
        paymentMode: 1,

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
        model: 1,
        image: 1,
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

interface CreateOrderItemData {
  productId: string;
  quantity: number;
  discount?: number;
  deliveryCharges?: number;
}

interface CreateOrderData {
  customerId: string;
  paymentMode: PaymentMode;
  items: CreateOrderItemData[];
}

export const createOrder = async (data: CreateOrderData) => {
  const customer = await User.findById(data.customerId);

  if (!customer) {
    const error: any = new Error("Customer not found");
    error.statusCode = 404;
    throw error;
  }

  const productIds = data.items.map((item) => item.productId);

  // One DB query instead of one query per item
  const products = await Product.find({
    _id: { $in: productIds },
    isActive: true,
  });

  if (products.length !== productIds.length) {
    const error: any = new Error("One or more products not found");
    error.statusCode = 404;
    throw error;
  }

  // Create quick lookup map in memory
  const productMap = new Map(
    products.map(
      (product) => [product._id.toString(), product] as const
    )
  );

  let totalAmount = 0;

  const orderItemsData = data.items.map((item) => {
    const product = productMap.get(item.productId);

    const discount = item.discount || 0;
    const deliveryCharges = item.deliveryCharges || 0;

    const itemTotal =
      product!.price * item.quantity -
      discount +
      deliveryCharges;

    totalAmount += itemTotal;

    return {
      productId: product!._id,
      productName: product!.name,
      model: product!.model,
      image: product!.image,
      price: product!.price,
      quantity: item.quantity,
      discount,
      deliveryCharges,
      status: "PENDING",
    };
  });

  const orderId = Math.floor(
    10000000 + Math.random() * 90000000
  ).toString();

  const order = await Order.create({
    orderId,
    customerId: data.customerId,
    paymentMode: data.paymentMode,
    orderDate: new Date(),
    totalAmount,
  });

  const orderItems = orderItemsData.map((item) => ({
    ...item,
    orderId: order._id,
  }));

  await OrderItem.insertMany(orderItems);

  return {
    order,
    items: orderItems,
  };
};

