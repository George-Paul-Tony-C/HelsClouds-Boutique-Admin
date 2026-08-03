// File: src/lib/dashboard/revenue.ts

import { supabase } from "@/lib/supabase";

import type { DashboardAnalytics } from "@/types/dashboard";

export async function getRevenueAnalytics(): Promise<DashboardAnalytics> {
  const { data, error } = await supabase
    .from("orders")
    .select("total, created_at")
    .neq("status", "cancelled");

  if (error) throw error;

  const today = new Date();

  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  const startOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  const startOfYear = new Date(
    today.getFullYear(),
    0,
    1
  );

  const revenue: DashboardAnalytics = {
    today: 0,
    week: 0,
    month: 0,
    year: 0,
  };

  data.forEach((order) => {
    const orderDate = new Date(order.created_at);

    if (orderDate >= startOfYear) {
      revenue.year += Number(order.total);
    }

    if (orderDate >= startOfMonth) {
      revenue.month += Number(order.total);
    }

    if (orderDate >= startOfWeek) {
      revenue.week += Number(order.total);
    }

    if (orderDate >= startOfToday) {
      revenue.today += Number(order.total);
    }
  });

  return revenue;
}