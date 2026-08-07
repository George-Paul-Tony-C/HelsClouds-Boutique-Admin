// File: src/components/orders/OrderSummaryCard.tsx

import {
  CreditCard,
  ShoppingBag,
} from "lucide-react";

import type {
  Order,
} from "@/types/order";

interface OrderSummaryCardProps {
  order: Order;
}

export default function OrderSummaryCard({
  order,
}: OrderSummaryCardProps) {
  return (
    <section className="rounded-xl border bg-white p-6">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Order Summary
        </h2>

        <p className="text-sm text-slate-500">
          Payment breakdown for this order.
        </p>

      </div>

      <div className="space-y-5">

        <div className="flex items-center gap-3">

          <div className="rounded-lg bg-slate-100 p-2">

            <ShoppingBag
              size={18}
              className="text-slate-600"
            />

          </div>

          <div className="flex-1">

            <div className="text-sm text-slate-500">
              Subtotal
            </div>

            <div className="text-lg font-semibold">
              ₹
              {Number(
                order.subtotal
              ).toLocaleString(
                "en-IN",
                {
                  minimumFractionDigits: 2,
                }
              )}
            </div>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="rounded-lg bg-slate-100 p-2">

            <CreditCard
              size={18}
              className="text-slate-600"
            />

          </div>

          <div className="flex-1">

            <div className="text-sm text-slate-500">
              Shipping Charge
            </div>

            <div className="text-lg font-semibold">
              ₹
              {Number(
                order.shipping_charge
              ).toLocaleString(
                "en-IN",
                {
                  minimumFractionDigits: 2,
                }
              )}
            </div>

          </div>

        </div>

        <div className="border-t pt-5">

          <div className="flex items-center justify-between">

            <span className="text-lg font-semibold">
              Total Amount
            </span>

            <span className="text-2xl font-bold text-green-600">
              ₹
              {Number(
                order.total
              ).toLocaleString(
                "en-IN",
                {
                  minimumFractionDigits: 2,
                }
              )}
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}