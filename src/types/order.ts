// File: src/types/order.ts

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;

  order_number: string;

  profile_id: string;

  address_id: string;

  status: OrderStatus;

  subtotal: number;

  shipping_charge: number;

  total: number;

  notes: string | null;

  created_at: string;

  updated_at: string;

  profile?: {
    id: string;
    full_name: string;
    email: string;
    phone_number: string;
  };

  address?: {
    id: string;
    full_name: string;
    phone_number: string;
    address_line_1: string;
    address_line_2: string | null;
    city: string;
    state: string;
    postal_code: string;
  };
}

export interface OrderItem {
  id: string;

  order_id: string;

  product_id: string;

  variant_id: string | null;

  quantity: number;

  unit_price: number;

  total_price: number;

  product?: {
    id: string;
    name: string;
    product_code: string;
    featured_image_url: string | null;
  };

  variant?: {
    id: string;
    variant_name: string;
    sku: string;
  };
}

export interface UpdateOrderStatus {
  status: OrderStatus;
}