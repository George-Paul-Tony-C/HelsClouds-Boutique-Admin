// File: src/lib/dashboard/index.ts

import type { DashboardData } from "@/types/dashboard";

import { getDashboardCounts } from "./counts";
import { getRevenueAnalytics } from "./revenue";
import { getProfitAnalytics } from "./profit";
import {
  getTopProducts,
  getTopCategories,
} from "./products";
import { getRecentOrders } from "./orders";

export async function getDashboardData(): Promise<DashboardData> {
  const [
    counts,
    revenue,
    profit,
    recentOrders,
    topProducts,
    topCategories,
  ] = await Promise.all([
    getDashboardCounts(),
    getRevenueAnalytics(),
    getProfitAnalytics(),
    getRecentOrders(),
    getTopProducts(),
    getTopCategories(),
  ]);

  return {
    counts,
    revenue,
    profit,
    recentOrders,
    topProducts,
    topCategories,
  };
}