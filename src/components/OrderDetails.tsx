// File: src/components/OrderDetails.tsx

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  getOrderById,
  getOrderItems,
  updateOrderStatus,
} from "@/lib/orders";

import type {
  Order,
  OrderItem,
  OrderStatus,
} from "@/types/order";

interface OrderDetailsProps {
  orderId: string | null;
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

const statusStyles: Record<OrderStatus, string> = {
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

export default function OrderDetails({
  orderId,
  onUpdated,
}: OrderDetailsProps) {
  const [order, setOrder] =
    useState<Order | null>(null);

  const [items, setItems] =
    useState<OrderItem[]>([]);

  const [status, setStatus] =
    useState<OrderStatus>("pending");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
  if (!orderId) return;

  const id = orderId;

  async function loadOrder() {
    try {
      setLoading(true);

      const orderData = await getOrderById(id);

      const orderItems = await getOrderItems(id);

      setOrder(orderData);
      setItems(orderItems);
      setStatus(orderData.status);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  loadOrder();
}, [orderId]);

  async function saveStatus() {
    try {
      await updateOrderStatus(
        orderId!,
        status
      );

      onUpdated();

      alert("Order updated.");
    } catch (error) {
      console.error(error);
    }
  }

  if (!orderId) {
    return (
      <div className="rounded-xl border bg-white p-6 text-center text-slate-500">
        Select an order.
      </div>
    );
  }

  if (loading || !order) {
    return (
      <div className="rounded-xl border bg-white p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-xl border bg-white p-6">

      {/* Header */}

      <div>

        <h2 className="text-xl font-semibold">
          {order.order_number}
        </h2>

        <p className="text-sm text-slate-500">
          {new Date(
            order.created_at
          ).toLocaleString()}
        </p>

      </div>

      {/* Customer */}

      <div>

        <h3 className="mb-2 font-semibold">
          Customer
        </h3>

        <p>{order.profile?.full_name}</p>

        <p>{order.profile?.phone_number}</p>

        <p>{order.profile?.email}</p>

      </div>

      {/* Address */}

      <div>

        <h3 className="mb-2 font-semibold">
          Shipping Address
        </h3>

        <p>{order.address?.address_line_1}</p>

        {order.address?.address_line_2 && (
          <p>
            {order.address.address_line_2}
          </p>
        )}

        <p>
          {order.address?.city},{" "}
          {order.address?.state}
        </p>

        <p>
          {order.address?.postal_code}
        </p>

      </div>

      {/* Products */}

      <div>

        <h3 className="mb-3 font-semibold">
          Products
        </h3>

        <div className="space-y-3">

          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-lg border p-3"
            >

              {item.product?.featured_image_url ? (
                <img
                  src={
                    item.product
                      .featured_image_url
                  }
                  alt={item.product.name}
                  className="h-14 w-14 rounded object-cover"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded bg-slate-200 text-xs">
                  No Image
                </div>
              )}

              <div className="flex-1">

                <div className="font-medium">
                  {item.product?.name}
                </div>

                <div className="text-xs text-slate-500">
                  {item.product?.product_code}
                </div>

                {item.variant && (
                  <div className="text-xs">
                    {item.variant.variant_name}
                  </div>
                )}

              </div>

              <div className="text-right">

                <div>
                  Qty : {item.quantity}
                </div>

                <div>
                  ₹{item.total_price}
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Summary */}

      <div className="space-y-2">

        <div className="flex justify-between">

          <span>Subtotal</span>

          <span>
            ₹{order.subtotal}
          </span>

        </div>

        <div className="flex justify-between">

          <span>Shipping</span>

          <span>
            ₹{order.shipping_charge}
          </span>

        </div>

        <div className="flex justify-between font-semibold">

          <span>Total</span>

          <span>
            ₹{order.total}
          </span>

        </div>

      </div>

      {/* Status */}

      <div className="space-y-3">

        <label className="block font-medium">
          Current Status
        </label>

        <div
          className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${
            statusStyles[status]
          }`}
        >
          {status.charAt(0).toUpperCase() +
            status.slice(1)}
        </div>

        <select
          className="w-full rounded-md border p-2"
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value as OrderStatus
            )
          }
        >
          {statuses.map((status) => (
            <option
              key={status}
              value={status}
            >
              {status.charAt(0).toUpperCase() +
                status.slice(1)}
            </option>
          ))}
        </select>

      </div>

      <Button
        className="w-full"
        onClick={saveStatus}
      >
        Update Status
      </Button>

    </div>
  );
}