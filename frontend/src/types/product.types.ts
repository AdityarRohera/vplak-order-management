
export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface Product {
  _id: string;
  name: string;
  model?: string;
  sku: string;
  image?: string;
  price: number;
  stock: number;
  isActive: boolean;
  categoryId?: Category;
}
