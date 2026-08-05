// File: src/components/products/ProductPricing.tsx

import type { ProductFormData } from "@/types/product";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductPricingProps {
  form: ProductFormData;

  setForm: React.Dispatch<
    React.SetStateAction<ProductFormData>
  >;
}

export default function ProductPricing({
  form,
  setForm,
}: ProductPricingProps) {
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  }

  const profit =
    form.selling_price - form.cost_price;

  const margin =
    form.selling_price > 0
      ? (
          (profit / form.selling_price) *
          100
        ).toFixed(2)
      : "0.00";

  return (
    <section className="rounded-xl border bg-white p-6">

      <h2 className="mb-6 text-xl font-semibold">
        Pricing
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <Label>Cost Price</Label>

          <Input
            className="mt-2"
            type="number"
            min={0}
            step="0.01"
            name="cost_price"
            value={form.cost_price}
            onChange={handleChange}
          />

        </div>

        <div>

          <Label>Selling Price</Label>

          <Input
            className="mt-2"
            type="number"
            min={0}
            step="0.01"
            name="selling_price"
            value={form.selling_price}
            onChange={handleChange}
          />

        </div>

      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">

        <div className="rounded-lg border bg-slate-50 p-4">

          <p className="text-sm text-slate-500">
            Estimated Profit
          </p>

          <p className="mt-2 text-2xl font-bold text-green-600">
            ₹
            {profit.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </p>

        </div>

        <div className="rounded-lg border bg-slate-50 p-4">

          <p className="text-sm text-slate-500">
            Profit Margin
          </p>

          <p className="mt-2 text-2xl font-bold text-blue-600">
            {margin}%
          </p>

        </div>

      </div>

    </section>
  );
}