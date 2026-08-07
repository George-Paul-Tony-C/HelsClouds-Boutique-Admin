// File: src/components/orders/OrderItemsCard.tsx

import {
  ArrowRight,
  Package,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import type {
  OrderItem,
} from "@/types/order";

import { Button } from "@/components/ui/button";

interface OrderItemsCardProps {
  items: OrderItem[];
}

export default function OrderItemsCard({
  items,
}: OrderItemsCardProps) {
  const navigate =
    useNavigate();

  return (
    <section className="rounded-xl border bg-white p-6">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Ordered Products
        </h2>

        <p className="text-sm text-slate-500">
          Products included in this order.
        </p>

      </div>

      {items.length === 0 ? (

        <div className="rounded-lg border border-dashed py-12 text-center text-slate-500">

          No products found.

        </div>

      ) : (

        <div className="space-y-5">

          {items.map((item) => (

            <div
              key={item.id}
              className="rounded-xl border bg-white p-4 shadow-sm"
            >

              <div className="flex flex-col gap-4 sm:flex-row">

                {/* Product Image */}

                <div className="flex justify-center sm:block">

                  {item.product?.featured_image_url ? (

                    <img
                      src={
                        item.product
                          .featured_image_url
                      }
                      alt={
                        item.product.name
                      }
                      className="h-24 w-24 rounded-lg border object-cover"
                    />

                  ) : (

                    <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-slate-100">

                      <Package
                        className="text-slate-400"
                        size={32}
                      />

                    </div>

                  )}

                </div>

                {/* Product Details */}

                <div className="flex-1 space-y-2">

                  <div>

                    <h3 className="text-lg font-semibold">
                      {item.product?.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {item.product?.product_code}
                    </p>

                  </div>

                  {item.variant && (

                    <div className="text-sm text-slate-600">

                      Variant:
                      <span className="ml-1 font-medium">
                        {item.variant.variant_name}
                      </span>

                    </div>

                  )}

                  <div className="grid gap-3 pt-2 sm:grid-cols-3">

                    <div>

                      <div className="text-xs text-slate-500">
                        Quantity
                      </div>

                      <div className="font-semibold">
                        {item.quantity}
                      </div>

                    </div>

                    <div>

                      <div className="text-xs text-slate-500">
                        Unit Price
                      </div>

                      <div className="font-semibold">
                        ₹
                        {Number(
                          item.unit_price
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </div>

                    </div>

                    <div>

                      <div className="text-xs text-slate-500">
                        Total
                      </div>

                      <div className="font-semibold">
                        ₹
                        {Number(
                          item.total_price
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </div>

                    </div>

                  </div>

                </div>

                {/* View Product */}

                <div className="flex items-center">

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      navigate(
                        `/products/${item.product?.id}`
                      )
                    }
                  >

                    View Product

                    <ArrowRight
                      size={16}
                      className="ml-2"
                    />

                  </Button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}