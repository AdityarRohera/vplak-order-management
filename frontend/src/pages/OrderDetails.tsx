
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { getOrderById } from "../services/order.api";
import type { Order } from "../types/order.types";

import Navbar from "../components/Navbar";
import OrderCard from "../components/OrderCard";

const OrderDetails = () => {
  const { orderId } = useParams();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  const loadOrder = async (orderId: string) => {
    setLoading(true);

    try {
      const res = await getOrderById(orderId);

      // API returns { order, items } - merge into one object
      setOrder({
        ...res.data.order,
        items: res.data.items,
      });
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "Failed to load order"
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    if (orderId) {
      loadOrder(orderId);
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <Link
          to="/orders"
          className="mb-6 inline-block font-medium text-blue-600 underline"
        >
          Back to orders
        </Link>

        {loading && (
          <p className="text-center text-gray-600">
            Loading...
          </p>
        )}

        {!loading && !order && (
          <p className="text-center text-gray-600">
            Order not found
          </p>
        )}

        {!loading && order && <OrderCard order={order} />}
      </div>
    </div>
  );
};

export default OrderDetails;
