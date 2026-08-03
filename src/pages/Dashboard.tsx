// File: src/pages/Dashboard.tsx

import { useEffect, useState } from "react";

import DashboardCards from "@/components/dashboard/DashboardCards";
import ProfitCards from "@/components/dashboard/ProfitCards";
import RecentOrders from "@/components/dashboard/RecentOrders";
import RevenueCards from "@/components/dashboard/RevenueCards";
import TopCategories from "@/components/dashboard/TopCategories";
import TopProducts from "@/components/dashboard/TopProducts";

import { getDashboardData } from "@/lib/dashboard";

import type { DashboardData } from "@/types/dashboard";

export default function Dashboard() {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      const data =
        await getDashboardData();

      setDashboard(data);
    } catch (error) {
      console.error(error);

      alert("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-slate-500">
        Loading Dashboard...
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-red-500">
        Failed to load dashboard.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-slate-500">
          Welcome back! Here's your boutique overview.
        </p>

      </div>

      {/* Counts */}

      <DashboardCards
        counts={dashboard.counts}
      />

      {/* Revenue */}

      <RevenueCards
        revenue={dashboard.revenue}
      />

      {/* Profit */}

      <ProfitCards
        profit={dashboard.profit}
      />

      {/* Products & Categories */}

      <div className="grid gap-6 xl:grid-cols-2">

        <TopProducts
          products={dashboard.topProducts}
        />

        <TopCategories
          categories={
            dashboard.topCategories
          }
        />

      </div>

      {/* Recent Orders */}

      <RecentOrders
        orders={dashboard.recentOrders}
      />

    </div>
  );
}