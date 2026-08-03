// File: src/lib/dashboard/orders.ts

import { supabase } from "@/lib/supabase";

import type { RecentOrder } from "@/types/dashboard";

export async function getRecentOrders(): Promise<RecentOrder[]> {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      order_number,
      total,
      status,
      created_at,
      profile:profiles(
        full_name
      )
    `)
    .order("created_at", {
      ascending: false,
    })
    .limit(10);

  if (error) throw error;

  return (data ?? []).map((order: any) => ({
    id: order.id,

    order_number: order.order_number,

    customer_name:
      order.profile?.full_name ?? "Unknown",

    total: Number(order.total),

    status: order.status,

    created_at: order.created_at,
  }));
}