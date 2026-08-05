// File: src/components/categories/CategoryOptions.tsx

import type { CategoryFormData } from "@/types/category";

interface CategoryOptionsProps {
  form: CategoryFormData;

  setForm: React.Dispatch<
    React.SetStateAction<CategoryFormData>
  >;
}

export default function CategoryOptions({
  form,
  setForm,
}: CategoryOptionsProps) {
  return (
    <section className="rounded-xl border bg-white p-6">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Category Options
        </h2>

        <p className="text-sm text-slate-500">
          Configure how this category appears
          throughout the website.
        </p>

      </div>

      <div className="rounded-lg border p-4">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="font-medium">
              Active Category
            </h3>

            <p className="text-sm text-slate-500">
              Customers can view products in this category.
            </p>

          </div>

          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                is_active:
                  e.target.checked,
              }))
            }
            className="h-5 w-5 cursor-pointer rounded"
          />

        </div>

      </div>

    </section>
  );
}