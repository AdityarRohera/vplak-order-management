
import { Link } from "react-router-dom";

import type { Order } from "../types/order.types";
import { formatDate } from "../utils/formatDate";
import OrderItemCard from "./OrderItemCard";

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex flex-wrap items-start gap-6">
        <div className="w-44">
          <p className="font-bold text-gray-800">
            Order Date
          </p>
          <p className="text-gray-600">
            {formatDate(order.orderDate)}
          </p>
        </div>

        <div className="w-40">
          <p className="font-bold text-gray-800">
            Order ID
          </p>

          <Link
            to={`/orders/${order.orderId}`}
            className="font-medium text-blue-600 underline"
          >
            {order.orderId}
          </Link>

          <p className="mt-1">
            <span className="rounded bg-amber-300 px-3 py-1 text-sm capitalize text-gray-800">
              {order.paymentMode?.toLowerCase()}
            </span>
          </p>
        </div>

        <div className="min-w-[240px] flex-1">
          <p className="font-bold text-gray-800">
            Buyer Details
          </p>

          <p className="text-gray-700">
            <span className="font-bold">Name:</span>{" "}
            {order.customer.name}
          </p>

          <p className="text-gray-700">
            <span className="font-bold">State:</span>{" "}
            {order.customer.state}
          </p>

          <p className="text-gray-700">
            <span className="font-bold">Email:</span>{" "}
            {order.customer.email}
          </p>

          <p className="text-gray-700">
            <span className="font-bold">Phone:</span>{" "}
            {order.customer.phone}
          </p>
        </div>

        <div className="w-32">
          <p className="text-lg font-bold text-gray-800">
            Total: ₹{order.totalAmount}
          </p>
        </div>

        <button
          type="button"
          className="rounded bg-gray-600 px-5 py-2 font-bold text-white hover:bg-gray-700"
        >
          TRACK
        </button>

        <Link
          to={`/orders/${order.orderId}`}
          className="font-medium text-blue-600 underline"
        >
          Generate Invoice
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {order.items.map((item) => (
          <OrderItemCard
            key={item._id}
            item={item}
            orderDate={order.orderDate}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
