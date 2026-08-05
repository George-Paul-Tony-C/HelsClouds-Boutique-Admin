// File: src/pages/Orders.tsx

import { useEffect, useState } from "react";

import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import OrderDetails from "@/components/OrderDetails";

import { getOrders } from "@/lib/orders";

import type {
  Order,
  OrderStatus,
} from "@/types/order";
import { error } from "@/lib/toast";
import { getErrorMessage } from "@/lib/error";

const statusStyles: Record<OrderStatus, string> = {
  pending:
    "bg-yellow-100 text-yellow-700",

  confirmed:
    "bg-blue-100 text-blue-700",

  processing:
    "bg-purple-100 text-purple-700",

  shipped:
    "bg-cyan-100 text-cyan-700",

  delivered:
    "bg-green-100 text-green-700",

  cancelled:
    "bg-red-100 text-red-700",
};

export default function Orders() {
  const [orders, setOrders] =
    useState<Order[]>([]);

  const [selectedOrderId, setSelectedOrderId] =
    useState<string | null>(null);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      setLoading(true);

      const data = await getOrders();

      setOrders(data ?? []);
    } catch (err) {
        console.error(err);

        error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.order_number
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      order.profile?.full_name
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_500px]">

      {/* LEFT */}

      <section className="rounded-xl border bg-white p-6">

        <div className="mb-6">

          <h1 className="text-2xl font-bold">
            Orders
          </h1>

          <p className="text-sm text-slate-500">
            Manage customer orders.
          </p>

        </div>

        <Input
          placeholder="Search order..."
          className="mb-6"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <div className="overflow-hidden rounded-lg border">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="px-4 py-3 text-left">
                  Order
                </th>

                <th className="px-4 py-3 text-left">
                  Customer
                </th>

                <th className="px-4 py-3 text-left">
                  Total
                </th>

                <th className="px-4 py-3 text-left">
                  Status
                </th>

                <th className="px-4 py-3 text-center">
                  View
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={5}
                    className="py-10 text-center"
                  >
                    Loading...
                  </td>

                </tr>

              ) : filteredOrders.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="py-10 text-center text-slate-500"
                  >
                    No orders found.
                  </td>

                </tr>

              ) : (

                filteredOrders.map((order) => (

                  <tr
                    key={order.id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="px-4 py-3">

                      <div className="font-medium">
                        {order.order_number}
                      </div>

                      <div className="text-xs text-slate-500">
                        {new Date(
                          order.created_at
                        ).toLocaleDateString()}
                      </div>

                    </td>

                    <td className="px-4 py-3">
                      {order.profile?.full_name}
                    </td>

                    <td className="px-4 py-3">
                      ₹
                      {Number(order.total).toLocaleString(
                        "en-IN",
                        {
                          minimumFractionDigits: 2,
                        }
                      )}
                    </td>

                    <td className="px-4 py-3">

                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          statusStyles[
                            order.status
                          ]
                        }`}
                      >
                        {order.status
                          .charAt(0)
                          .toUpperCase() +
                          order.status.slice(1)}
                      </span>

                    </td>

                    <td className="px-4 py-3">

                      <div className="flex justify-center">

                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() =>
                            setSelectedOrderId(
                              order.id
                            )
                          }
                        >
                          <Eye size={16} />
                        </Button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </section>

      {/* RIGHT */}

      <OrderDetails
        orderId={selectedOrderId}
        onUpdated={loadOrders}
      />

    </div>
  );
}