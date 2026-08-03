// File: src/components/dashboard/RevenueCards.tsx

import {
  Calendar,
  CalendarDays,
  CalendarRange,
  Landmark,
} from "lucide-react";

import type { DashboardAnalytics } from "@/types/dashboard";

interface RevenueCardsProps {
  revenue: DashboardAnalytics;
}

const cards = [
  {
    title: "Today",
    value: "today",
    icon: Calendar,
  },
  {
    title: "This Week",
    value: "week",
    icon: CalendarDays,
  },
  {
    title: "This Month",
    value: "month",
    icon: CalendarRange,
  },
  {
    title: "This Year",
    value: "year",
    icon: Landmark,
  },
] as const;

export default function RevenueCards({
  revenue,
}: RevenueCardsProps) {
  return (
    <section className="rounded-xl border bg-white p-6">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Revenue Analytics
        </h2>

        <p className="text-sm text-slate-500">
          Revenue generated from completed orders.
        </p>

      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        {cards.map((card) => {

          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-lg border p-5"
            >

              <div className="mb-4 flex items-center justify-between">

                <span className="text-sm text-slate-500">
                  {card.title}
                </span>

                <Icon
                  size={18}
                  className="text-slate-500"
                />

              </div>

              <h3 className="text-2xl font-bold">

                ₹
                {revenue[
                  card.value
                ].toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}

              </h3>

            </div>
          );
        })}

      </div>

    </section>
  );
}