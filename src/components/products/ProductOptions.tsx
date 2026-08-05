// File: src/components/products/ProductOptions.tsx

import type { ProductFormData } from "@/types/product";

interface ProductOptionsProps {
  form: ProductFormData;

  setForm: React.Dispatch<
    React.SetStateAction<ProductFormData>
  >;
}

export default function ProductOptions({
  form,
  setForm,
}: ProductOptionsProps) {
  function toggle(
    field: keyof Pick<
      ProductFormData,
      | "is_best_seller"
      | "is_new_arrival"
      | "is_featured"
      | "is_available"
    >
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }

  const options = [
    {
      title: "Best Seller",
      description:
        "Show this product in the Best Seller section.",
      field: "is_best_seller",
    },
    {
      title: "New Arrival",
      description:
        "Display this product in the New Arrivals section.",
      field: "is_new_arrival",
    },
    {
      title: "Featured Product",
      description:
        "Highlight this product across the website.",
      field: "is_featured",
    },
    {
      title: "Active",
      description:
        "Customers can view and purchase this product.",
      field: "is_available",
    },
  ] as const;

  return (
    <section className="rounded-xl border bg-white p-6">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Product Options
        </h2>

        <p className="text-sm text-slate-500">
          Configure how this product appears
          on the website.
        </p>

      </div>

      <div className="space-y-4">

        {options.map((option) => (

          <div
            key={option.field}
            className="flex items-center justify-between rounded-lg border p-4"
          >

            <div>

              <h3 className="font-medium">
                {option.title}
              </h3>

              <p className="text-sm text-slate-500">
                {option.description}
              </p>

            </div>

            <input
              type="checkbox"
              checked={form[option.field]}
              onChange={() =>
                toggle(option.field)
              }
              className="h-5 w-5 cursor-pointer rounded"
            />

          </div>

        ))}

      </div>

    </section>
  );
}