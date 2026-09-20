import { Product } from "../models/Product";
// registers the Category schema so .populate("categoryId") works
import "../models/Category";

export const createProduct = async (data: any) => {
  const product = await Product.create(data);
  return product;
};

export const getProducts = async () => {
  const products = await Product.find({
    isActive: true,
  }).populate("categoryId", "name slug");

  return products;
};

export const getProductById = async (id: string) => {
  const product = await Product.findById(id).populate(
    "categoryId",
    "name slug"
  );

  if (!product) {
    const error: any = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return product;
};

export const updateProduct = async (
  id: string,
  data: any
) => {
  const product = await Product.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    const error: any = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return product;
};

export const deleteProduct = async (id: string) => {
  const product = await Product.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  if (!product) {
    const error: any = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return product;
};