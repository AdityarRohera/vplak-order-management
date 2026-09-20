
import { useEffect, useState } from "react";

import { searchOrders } from "../services/order.api";
import type { Order } from "../types/order.types";

import Navbar from "../components/Navbar";
import SearchOrderForm from "../components/SearchOrderForm";
import OrderCard from "../components/OrderCard";

const SearchOrder = () => {
  const [by, setBy] = useState("orderId");
  const [value, setValue] = useState("");

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const loadOrders = async (
    by?: string,
    value?: string
  ) => {
    setLoading(true);

    try {
      const res = await searchOrders(by, value);

      setOrders(res.data);
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "Failed to load orders"
      );
    }

    setLoading(false);
  };

  // Load all orders on first render
  useEffect(() => {
    loadOrders();
  }, []);

  const handleSearch = () => {
    loadOrders(by, value);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 pb-20 pt-8">
        <h1 className="text-center text-3xl font-bold text-white">
          SEARCH ORDER
        </h1>
      </div>

      <div className="mx-auto -mt-14 max-w-7xl px-6 pb-10">
        <SearchOrderForm
          by={by}
          value={value}
          onByChange={setBy}
          onValueChange={setValue}
          onSearch={handleSearch}
        />

        <div className="mt-8 flex flex-col gap-8">
          {loading && (
            <p className="text-center text-gray-600">
              Loading...
            </p>
          )}

          {!loading && orders.length === 0 && (
            <p className="text-center text-gray-600">
              No orders found
            </p>
          )}

          {!loading &&
            orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchOrder;
