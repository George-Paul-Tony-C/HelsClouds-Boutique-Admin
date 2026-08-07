// File: src/pages/OrderDetails.tsx

import {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { Button } from "@/components/ui/button";

import CustomerCard from "@/components/orders/CustomerCard";
import ShippingCard from "@/components/orders/ShippingCard";
import OrderItemsCard from "@/components/orders/OrderItemsCard";
import OrderSummaryCard from "@/components/orders/OrderSummaryCard";
import OrderStatusCard from "@/components/orders/OrderStatusCard";

import {
  getOrderById,
  getOrderItems,
} from "@/lib/orders";

import type {
  Order,
  OrderItem,
} from "@/types/order";

import { error } from "@/lib/toast";
import { getErrorMessage } from "@/lib/error";

export default function OrderDetails() {
  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const [order, setOrder] =
    useState<Order | null>(null);

  const [items, setItems] =
    useState<OrderItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!id) return;

    loadOrder();
  }, [id]);

  async function loadOrder() {
    try {
      setLoading(true);

      const [
        orderData,
        orderItems,
      ] = await Promise.all([
        getOrderById(id!),
        getOrderItems(id!),
      ]);

      setOrder(orderData);

      setItems(orderItems);
    } catch (err) {
      console.error(err);

      error(
        getErrorMessage(err)
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        Loading Order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        Order not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <Button
        variant="outline"
        onClick={() =>
          navigate(-1)
        }
      >
        <ArrowLeft
          size={18}
          className="mr-2"
        />

        Back to Orders

      </Button>

      <div>

        <h1 className="text-3xl font-bold">
          {order.order_number}
        </h1>

        <p className="text-slate-500">
          {new Date(
            order.created_at
          ).toLocaleString()}
        </p>

      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <CustomerCard
          profile={order.profile}
        />

        <ShippingCard
          address={order.address}
        />

      </div>

      <OrderItemsCard
        items={items}
      />

      <div className="grid gap-6 xl:grid-cols-2">

        <OrderSummaryCard
          order={order}
        />

        <OrderStatusCard
          order={order}
          onUpdated={loadOrder}
        />

      </div>

    </div>
  );
}