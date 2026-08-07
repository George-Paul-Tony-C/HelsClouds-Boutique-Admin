// File: src/lib/dashboard/orders.ts

import { supabase } from "@/lib/supabase";

import type { RecentOrder } from "@/types/dashboard";

export async function getRecentOrders(): Promise<
  RecentOrder[]
> {
  const { data, error } =
    await supabase.rpc(
      "get_admin_orders"
    );

  if (error) throw error;

  return (data ?? [])
    .slice(0, 10)
    .map((order: any) => ({
      id: order.id,

      order_number:
        order.order_number,

      customer_name:
        order.customer_name,

      total: Number(
        order.total
      ),

      status:
        order.status,

      created_at:
        order.created_at,
    }));
}