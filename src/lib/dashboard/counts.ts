// File: src/lib/dashboard/counts.ts

import { supabase } from "@/lib/supabase";

import type { DashboardCounts } from "@/types/dashboard";

export async function getDashboardCounts(): Promise<DashboardCounts> {
  const [
    products,
    categories,
    customers,
    orders,
    pendingOrders,
  ] = await Promise.all([
    supabase
      .from("products")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("categories")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("profiles")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("role", "customer"),

    supabase
      .from("orders")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("orders")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "pending"),
  ]);

  return {
    totalProducts: products.count ?? 0,

    totalCategories: categories.count ?? 0,

    totalCustomers: customers.count ?? 0,

    totalOrders: orders.count ?? 0,

    pendingOrders: pendingOrders.count ?? 0,
  };
}