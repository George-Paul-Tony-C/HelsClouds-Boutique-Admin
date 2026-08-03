// File: src/components/dashboard/TopProducts.tsx

import type { TopProduct } from "@/types/dashboard";

interface TopProductsProps {
  products: TopProduct[];
}

export default function TopProducts({
  products,
}: TopProductsProps) {
  return (
    <section className="rounded-xl border bg-white p-6">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Top Selling Products
        </h2>

        <p className="text-sm text-slate-500">
          Best performing products based on sales.
        </p>

      </div>

      <div className="space-y-4">

        {products.length === 0 ? (

          <div className="py-8 text-center text-slate-500">
            No products found.
          </div>

        ) : (

          products.map((product, index) => (

            <div
              key={product.product_id}
              className="flex items-center gap-4 rounded-lg border p-4"
            >

              <div className="w-8 text-center text-lg font-bold text-slate-400">
                #{index + 1}
              </div>

              {product.featured_image_url ? (

                <img
                  src={product.featured_image_url}
                  alt={product.product_name}
                  className="h-16 w-16 rounded-lg object-cover"
                />

              ) : (

                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-slate-200 text-xs">
                  No Image
                </div>

              )}

              <div className="flex-1">

                <h3 className="font-semibold">
                  {product.product_name}
                </h3>

                <p className="text-xs text-slate-500">
                  {product.product_code}
                </p>

              </div>

              <div className="text-right">

                <div className="text-sm">
                  Sold
                </div>

                <div className="font-bold">
                  {product.quantity_sold}
                </div>

              </div>

              <div className="text-right">

                <div className="text-sm">
                  Revenue
                </div>

                <div className="font-semibold">
                  ₹
                  {product.revenue.toLocaleString(
                    "en-IN"
                  )}
                </div>

              </div>

              <div className="text-right">

                <div className="text-sm">
                  Profit
                </div>

                <div className="font-semibold text-green-600">
                  ₹
                  {product.profit.toLocaleString(
                    "en-IN"
                  )}
                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </section>
  );
}