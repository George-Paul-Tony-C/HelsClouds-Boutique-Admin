// File: src/lib/orders.ts

import { supabase } from "./supabase";

import type {
  Order,
  OrderItem,
  OrderStatus,
} from "@/types/order";

export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      profile:profiles(
        id,
        full_name,
        email,
        phone_number
      )
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return (data ?? []) as Order[];
}

export async function getOrderById(
  id: string 
): Promise<Order> {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      profile:profiles(
        id,
        full_name,
        email,
        phone_number
      ),
      address:addresses(*)
    `)
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Order;
}

export async function getOrderItems(
  orderId: string
): Promise<OrderItem[]> {
  const { data, error } = await supabase
    .from("order_items")
    .select(`
      *,
      product:products(
        id,
        product_code,
        name,
        featured_image_url
      ),
      variant:product_variants(
        id,
        variant_name,
        sku
      )
    `)
    .eq("order_id", orderId);

  if (error) throw error;

  return (data ?? []) as OrderItem[];
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
) {
  const { data, error } = await supabase
    .from("orders")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId)
    .select()
    .single();

  if (error) throw error;

  return data;
}