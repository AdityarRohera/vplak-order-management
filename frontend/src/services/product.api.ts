
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// Product routes are protected - token is saved by AuthContext on login
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// All active products
export const getProducts = async () => {
  try {
    const res = await axios.get(
      `${BASE_URL}/products`,
      authHeader()
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};

// Single product
export const getProductById = async (id: string) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/products/${id}`,
      authHeader()
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};
