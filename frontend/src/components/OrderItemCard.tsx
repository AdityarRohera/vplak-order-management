
import type { OrderItem } from "../types/order.types";
import { formatDateOnly } from "../utils/formatDate";

interface OrderItemCardProps {
  item: OrderItem;
  orderDate: string;
}

const statusColor = (status: string) => {
  if (status === "FULFILLED") return "text-green-600";
  if (status === "SHIPPED") return "text-blue-600";
  if (status === "CANCELLED") return "text-red-600";

  return "text-gray-600";
};

const OrderItemCard = ({
  item,
  orderDate,
}: OrderItemCardProps) => {
  return (
    <div className="flex gap-6 rounded border border-blue-100 bg-blue-50 p-4">
      {item.image ? (
        <img
          src={item.image}
          alt={item.productName}
          className="h-28 w-28 object-contain"
        />
      ) : (
        <div className="h-28 w-28 rounded bg-gray-200" />
      )}

      <div className="flex-1">
        <p className="mb-2 font-medium text-blue-600 underline">
          {item.productName}
        </p>

        <p className="text-gray-700">
          <span className="font-bold">Model:</span>{" "}
          {item.model}
        </p>

        <p className="text-gray-700">
          <span className="font-bold">Price:</span> ₹
          {item.price}
        </p>

        <p className="text-gray-700">
          <span className="font-bold">Date:</span>{" "}
          {formatDateOnly(orderDate)}
        </p>

        <p className="text-gray-700">
          <span className="font-bold">Discount:</span> ₹
          {item.discount}
        </p>
      </div>

      <div className="w-px bg-blue-200" />

      <div className="w-72">
        <p className="text-gray-700">
          <span className="font-bold">Qty:</span>{" "}
          {item.quantity}
        </p>

        <p className="text-gray-700">
          <span className="font-bold">
            Delivery Charges:
          </span>{" "}
          ₹{item.deliveryCharges}
        </p>

        <p className="text-gray-700">
          <span className="font-bold">Status:</span>{" "}
          <span
            className={`capitalize ${statusColor(
              item.status
            )}`}
          >
            {item.status?.toLowerCase()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default OrderItemCard;
