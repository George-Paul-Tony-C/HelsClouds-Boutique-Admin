// File: src/components/dashboard/DashboardCards.tsx

import {
  Boxes,
  FolderTree,
  ShoppingCart,
  Users,
} from "lucide-react";

import type { DashboardCounts } from "@/types/dashboard";

interface DashboardCardsProps {
  counts: DashboardCounts;
}

const cards = [
  {
    title: "Products",
    key: "totalProducts",
    icon: Boxes,
  },
  {
    title: "Categories",
    key: "totalCategories",
    icon: FolderTree,
  },
  {
    title: "Customers",
    key: "totalCustomers",
    icon: Users,
  },
  {
    title: "Pending Orders",
    key: "pendingOrders",
    icon: ShoppingCart,
  },
] as const;

export default function DashboardCards({
  counts,
}: DashboardCardsProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {counts[card.key]}
                </h2>

              </div>

              <div className="rounded-full bg-slate-100 p-3">

                <Icon
                  size={24}
                  className="text-slate-700"
                />

              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
}