
export interface Customer {
  name: string;
  email: string;
  phone: string;
  state: string;
}

export interface OrderItem {
  _id: string;
  productId: string;
  productName: string;
  model?: string;
  image?: string;
  price: number;
  quantity: number;
  discount: number;
  deliveryCharges: number;
  status: string;
}

export interface Order {
  _id: string;
  orderId: string;
  orderDate: string;
  paymentMode: string;
  totalAmount: number;
  customer: Customer;
  items: OrderItem[];
}
