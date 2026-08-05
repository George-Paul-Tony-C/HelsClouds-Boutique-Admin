// File: src/components/dashboard/TopCategories.tsx

import type { TopCategory } from "@/types/dashboard";

interface TopCategoriesProps {
  categories: TopCategory[];
}

export default function TopCategories({
  categories,
}: TopCategoriesProps) {
  return (
    <section className="rounded-xl border bg-white p-4 shadow-sm md:p-6">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Top Categories
        </h2>

        <p className="text-sm text-slate-500">
          Best performing categories by sales.
        </p>

      </div>

      {categories.length === 0 ? (

        <div className="py-10 text-center text-slate-500">
          No categories found.
        </div>

      ) : (

        <div className="space-y-4">

          {categories.map((category, index) => (

            <div
              key={category.category_id}
              className="rounded-xl border p-4 transition hover:shadow-md"
            >

              {/* Mobile */}

              <div className="block md:hidden">

                <div className="mb-4 flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-lg font-bold">
                    #{index + 1}
                  </div>

                  <div className="min-w-0 flex-1">

                    <h3 className="truncate font-semibold">
                      {category.category_name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {category.quantity_sold} items sold
                    </p>

                  </div>

                </div>

                <div className="rounded-lg bg-slate-50 p-4 text-center">

                  <div className="text-sm text-slate-500">
                    Revenue
                  </div>

                  <div className="mt-1 text-lg font-semibold">
                    ₹
                    {category.revenue.toLocaleString(
                      "en-IN"
                    )}
                  </div>

                </div>

              </div>

              {/* Desktop */}

              <div className="hidden items-center justify-between md:flex">

                <div className="flex items-center gap-4">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-bold">
                    #{index + 1}
                  </div>

                  <div>

                    <h3 className="font-semibold">
                      {category.category_name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {category.quantity_sold} items sold
                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <div className="text-sm text-slate-500">
                    Revenue
                  </div>

                  <div className="font-semibold">
                    ₹
                    {category.revenue.toLocaleString(
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