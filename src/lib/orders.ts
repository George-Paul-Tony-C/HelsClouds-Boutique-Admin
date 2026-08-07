// File: src/lib/orders.ts

import { supabase } from "./supabase";

import type {
  Order,
  OrderItem,
  OrderStatus,
} from "@/types/order";

  export async function getOrders(): Promise<Order[]> {
    const { data, error } =
      await supabase.rpc(
        "get_admin_orders"
      );

    if (error) throw error;

    return (data ?? []).map(
      (order: any) =>
        ({
          id: order.id,

          order_number:
            order.order_number,

          profile_id:
            order.profile_id,

          address_id:
            order.address_id,

          status:
            order.status,

          subtotal: Number(
            order.subtotal
          ),

          shipping_charge:
            Number(
              order.shipping_charge
            ),

          total: Number(
            order.total
          ),

          notes:
            order.notes,

          created_at:
            order.created_at,

          updated_at:
            order.updated_at,

          profile: {
            id: order.profile_id,

            full_name:
              order.customer_name,

            email:
              order.customer_email,

            phone_number:
              order.customer_phone,
          },
        }) as Order
    );
  }

export async function getOrderById(
  id: string
): Promise<Order> {
  const { data, error } =
    await supabase.rpc(
      "get_admin_order_by_id",
      {
        p_order_id: id,
      }
    );

  if (error) throw error;

  const row = data?.[0];

  if (!row) {
    throw new Error("Order not found.");
  }

  return {
    id: row.id,

    order_number: row.order_number,

    profile_id: row.profile_id,

    address_id: row.address_id,

    status: row.status,

    subtotal: Number(row.subtotal),

    shipping_charge: Number(
      row.shipping_charge
    ),

    total: Number(row.total),

    notes: row.notes,

    created_at: row.created_at,

    updated_at: row.updated_at,

    profile: {
      id: row.profile_id,
      full_name: row.customer_name,
      email: row.customer_email,
      phone_number: row.customer_phone,
    },

    address: {
      id: row.address_id,
      full_name: row.address_full_name,
      phone_number: row.address_phone,
      address_line_1: row.address_line_1,
      address_line_2: row.address_line_2,
      city: row.city,
      state: row.state,
      postal_code: row.postal_code,
    },
  };
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