
import { useEffect, useState } from "react";

import { getProducts } from "../services/product.api";
import type { Product } from "../types/product.types";

import Navbar from "../components/Navbar";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    setLoading(true);

    try {
      const res = await getProducts();

      setProducts(res.data);
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "Failed to load products"
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 pb-20 pt-8">
        <h1 className="text-center text-3xl font-bold text-white">
          PRODUCTS
        </h1>
      </div>

      <div className="mx-auto -mt-14 max-w-7xl px-6 pb-10">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-bold text-gray-800">
            All Products ({products.length})
          </h2>

          {loading && (
            <p className="text-center text-gray-600">
              Loading...
            </p>
          )}

          {!loading && products.length === 0 && (
            <p className="text-center text-gray-600">
              No products found
            </p>
          )}

          {!loading && products.length > 0 && (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 text-sm text-gray-600">
                  <th className="p-3">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Model</th>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b border-gray-100"
                  >
                    <td className="p-3">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-14 w-14 object-contain"
                        />
                      ) : (
                        <div className="h-14 w-14 rounded bg-gray-200" />
                      )}
                    </td>

                    <td className="p-3 font-medium text-blue-600">
                      {product.name}
                    </td>

                    <td className="p-3 text-gray-700">
                      {product.model}
                    </td>

                    <td className="p-3 text-gray-700">
                      {product.sku}
                    </td>

                    <td className="p-3 text-gray-700">
                      {product.categoryId?.name}
                    </td>

                    <td className="p-3 font-bold text-gray-800">
                      ₹{product.price}
                    </td>

                    <td className="p-3">
                      <span
                        className={
                          product.stock > 0
                            ? "rounded bg-green-100 px-3 py-1 text-sm text-green-700"
                            : "rounded bg-red-100 px-3 py-1 text-sm text-red-700"
                        }
                      >
                        {product.stock > 0
                          ? product.stock
                          : "Out of stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
