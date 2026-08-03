// File: src/lib/dashboard/profit.ts

import { supabase } from "@/lib/supabase";

import type { DashboardAnalytics } from "@/types/dashboard";

export async function getProfitAnalytics(): Promise<DashboardAnalytics> {
  const { data, error } = await supabase
    .from("order_items")
    .select(`
      quantity,
      order:orders(
        status,
        created_at
      ),
      product:products(
        cost_price,
        selling_price
      )
    `);

  if (error) throw error;

  const today = new Date();

  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(
    startOfWeek.getDate() - startOfWeek.getDay()
  );

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

  const profit: DashboardAnalytics = {
    today: 0,
    week: 0,
    month: 0,
    year: 0,
  };

  data.forEach((item: any) => {
    if (!item.order || !item.product) return;

    if (item.order.status === "cancelled") return;

    const orderDate = new Date(item.order.created_at);

    const itemProfit =
      (Number(item.product.selling_price) -
        Number(item.product.cost_price)) *
      Number(item.quantity);

    if (orderDate >= startOfYear) {
      profit.year += itemProfit;
    }

    if (orderDate >= startOfMonth) {
      profit.month += itemProfit;
    }

    if (orderDate >= startOfWeek) {
      profit.week += itemProfit;
    }

    if (orderDate >= startOfToday) {
      profit.today += itemProfit;
    }
  });

  return profit;
}