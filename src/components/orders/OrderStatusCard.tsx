// File: src/components/orders/OrderStatusCard.tsx

import { useState } from "react";

import {
  Clock3,
  Save,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  updateOrderStatus,
} from "@/lib/orders";

import type {
  Order,
  OrderStatus,
} from "@/types/order";

import {
  success,
  error,
} from "@/lib/toast";

import {
  getErrorMessage,
} from "@/lib/error";

interface OrderStatusCardProps {
  order: Order;

  onUpdated: () => void;
}

const statuses: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const statusStyles: Record<
  OrderStatus,
  string
> = {
  pending:
    "bg-yellow-100 text-yellow-700 border-yellow-200",

  confirmed:
    "bg-blue-100 text-blue-700 border-blue-200",

  processing:
    "bg-purple-100 text-purple-700 border-purple-200",

  shipped:
    "bg-cyan-100 text-cyan-700 border-cyan-200",

  delivered:
    "bg-green-100 text-green-700 border-green-200",

  cancelled:
    "bg-red-100 text-red-700 border-red-200",
};

export default function OrderStatusCard({
  order,
  onUpdated,
}: OrderStatusCardProps) {
  const [status, setStatus] =
    useState<OrderStatus>(
      order.status
    );

  const [loading, setLoading] =
    useState(false);

  async function handleUpdate() {
    try {
      setLoading(true);

      await updateOrderStatus(
        order.id,
        status
      );

      success(
        "Order status updated successfully."
      );

      onUpdated();
    } catch (err) {
      console.error(err);

      error(
        getErrorMessage(err)
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-xl border bg-white p-6">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Order Status
        </h2>

        <p className="text-sm text-slate-500">
          Update the current order status.
        </p>

      </div>

      <div className="space-y-6">

        <div>

          <div className="mb-2 text-sm text-slate-500">
            Current Status
          </div>

          <div
            className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold ${
              statusStyles[status]
            }`}
          >
            <Clock3
              size={16}
              className="mr-2"
            />

            {status
              .charAt(0)
              .toUpperCase() +
              status.slice(1)}

          </div>

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Change Status
          </label>

          <select
            className="w-full rounded-lg border bg-white p-3"
            value={status}
            onChange={(e) =>
              setStatus(
                e.target
                  .value as OrderStatus
              )
            }
          >
            {statuses.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item
                  .charAt(0)
                  .toUpperCase() +
                  item.slice(1)}
              </option>
            ))}
          </select>

        </div>

        <Button
          className="w-full"
          disabled={
            loading ||
            status === order.status
          }
          onClick={handleUpdate}
        >

          <Save
            size={18}
            className="mr-2"
          />

          {loading
            ? "Updating..."
            : "Update Status"}

        </Button>

      </div>

    </section>
  );
}