// File: src/components/products/ProductDetails.tsx

import type { ProductFormData } from "@/types/product";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductDetailsProps {
  form: ProductFormData;

  setForm: React.Dispatch<
    React.SetStateAction<ProductFormData>
  >;
}

export default function ProductDetails({
  form,
  setForm,
}: ProductDetailsProps) {
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "display_order"
          ? Number(value)
          : value,
    }));
  }

  return (
    <section className="rounded-xl border bg-white p-6">

      <h2 className="mb-6 text-xl font-semibold">
        Product Details
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <Label>Material</Label>

          <Input
            className="mt-2"
            name="material"
            value={form.material}
            onChange={handleChange}
            placeholder="Cotton, Silk, Linen..."
          />

        </div>

        <div>

          <Label>Color</Label>

          <Input
            className="mt-2"
            name="color"
            value={form.color}
            onChange={handleChange}
            placeholder="Red, Blue, Green..."
          />

        </div>

      </div>

      <div className="mt-6">

        <Label>Display Order</Label>

        <Input
          className="mt-2 max-w-xs"
          type="number"
          min={1}
          name="display_order"
          value={form.display_order}
          onChange={handleChange}
        />

        <p className="mt-2 text-sm text-slate-500">
          Products with lower display order appear first.
        </p>

      </div>

    </section>
  );
}