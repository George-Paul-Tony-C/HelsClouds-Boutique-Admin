// File: src/components/dashboard/TopProducts.tsx

import type { TopProduct } from "@/types/dashboard";

interface TopProductsProps {
  products: TopProduct[];
}

export default function TopProducts({
  products,
}: TopProductsProps) {
  return (
    <section className="rounded-xl border bg-white p-4 shadow-sm md:p-6">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Top Selling Products
        </h2>

        <p className="text-sm text-slate-500">
          Best performing products based on sales.
        </p>

      </div>

      {products.length === 0 ? (

        <div className="py-10 text-center text-slate-500">
          No products found.
        </div>

      ) : (

        <div className="space-y-4">

          {products.map((product, index) => (

            <div
              key={product.product_id}
              className="rounded-xl border p-4 transition hover:shadow-md"
            >

              {/* Mobile */}

              <div className="block md:hidden">

                <div className="mb-4 flex items-start gap-4">

                  <div className="text-lg font-bold text-slate-400">
                    #{index + 1}
                  </div>

                  {product.featured_image_url ? (

                    <img
                      src={product.featured_image_url}
                      alt={product.product_name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />

                  ) : (

                    <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-slate-200 text-xs">
                      No Image
                    </div>

                  )}

                  <div className="min-w-0 flex-1">

                    <h3 className="truncate font-semibold">
                      {product.product_name}
                    </h3>

                    <p className="text-xs text-slate-500">
                      {product.product_code}
                    </p>

                  </div>

                </div>

                <div className="grid grid-cols-3 gap-3">

                  <div className="rounded-lg bg-slate-50 p-3 text-center">

                    <div className="text-xs text-slate-500">
                      Sold
                    </div>

                    <div className="mt-1 font-bold">
                      {product.quantity_sold}
                    </div>

                  </div>

                  <div className="rounded-lg bg-slate-50 p-3 text-center">

                    <div className="text-xs text-slate-500">
                      Revenue
                    </div>

                    <div className="mt-1 font-semibold">
                      ₹
                      {product.revenue.toLocaleString(
                        "en-IN"
                      )}
                    </div>

                  </div>

                  <div className="rounded-lg bg-green-50 p-3 text-center">

                    <div className="text-xs text-slate-500">
                      Profit
                    </div>

                    <div className="mt-1 font-semibold text-green-600">
                      ₹
                      {product.profit.toLocaleString(
                        "en-IN"
                      )}
                    </div>

                  </div>

                </div>

              </div>

              {/* Desktop */}

              <div className="hidden items-center gap-4 md:flex">

                <div className="w-10 text-center text-lg font-bold text-slate-400">
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

                  <div className="text-sm text-slate-500">
                    Sold
                  </div>

                  <div className="font-bold">
                    {product.quantity_sold}
                  </div>

                </div>

                <div className="text-right">

                  <div className="text-sm text-slate-500">
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

                  <div className="text-sm text-slate-500">
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

            </div>

          ))}

        </div>

      )}

    </section>
  );
}