// File: src/components/dashboard/RecentOrders.tsx

import type { RecentOrder } from "@/types/dashboard";

interface RecentOrdersProps {
  orders: RecentOrder[];
}

export default function RecentOrders({
  orders,
}: RecentOrdersProps) {
  return (
    <section className="rounded-xl border bg-white p-6">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Recent Orders
        </h2>

        <p className="text-sm text-slate-500">
          Latest customer orders.
        </p>

      </div>

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

              <th className="px-4 py-3 text-left">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="py-8 text-center text-slate-500"
                >
                  No recent orders found.
                </td>

              </tr>

            ) : (

              orders.map((order) => (

                <tr
                  key={order.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-4 py-3 font-medium">
                    {order.order_number}
                  </td>

                  <td className="px-4 py-3">
                    {order.customer_name}
                  </td>

                  <td className="px-4 py-3">
                    ₹
                    {order.total.toLocaleString(
                      "en-IN",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
                  </td>

                  <td className="px-4 py-3">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium
                        ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : ""
                        }
                        ${
                          order.status === "confirmed"
                            ? "bg-blue-100 text-blue-700"
                            : ""
                        }
                        ${
                          order.status === "processing"
                            ? "bg-indigo-100 text-indigo-700"
                            : ""
                        }
                        ${
                          order.status === "shipped"
                            ? "bg-purple-100 text-purple-700"
                            : ""
                        }
                        ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-700"
                            : ""
                        }
                        ${
                          order.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : ""
                        }
                      `}
                    >
                      {order.status}
                    </span>

                  </td>

                  <td className="px-4 py-3 text-sm text-slate-500">

                    {new Date(
                      order.created_at
                    ).toLocaleDateString()}

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </section>
  );
}