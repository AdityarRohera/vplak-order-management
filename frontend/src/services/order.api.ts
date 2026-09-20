
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// Search orders (no by/value returns all orders)
export const searchOrders = async (by?: string, value?: string) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/orders/search`,
      { params: { by, value } }
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};

// Single order with its items
export const getOrderById = async (orderId: string) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/orders/${orderId}`
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};
