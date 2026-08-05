// File: src/components/categories/CategoryBasicInfo.tsx

import type { CategoryFormData } from "@/types/category";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CategoryBasicInfoProps {
  form: CategoryFormData;

  setForm: React.Dispatch<
    React.SetStateAction<CategoryFormData>
  >;
}

export default function CategoryBasicInfo({
  form,
  setForm,
}: CategoryBasicInfoProps) {
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setForm((prev) => {
      const updated = {
        ...prev,
        [name]:
          name === "display_order"
            ? Number(value)
            : value,
      };

      if (name === "name") {
        updated.slug = value
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-");
      }

      return updated;
    });
  }

  return (
    <section className="rounded-xl border bg-white p-6">

      <h2 className="mb-6 text-xl font-semibold">
        Basic Information
      </h2>

      <div className="space-y-5">

        <div>

          <Label>Category Name</Label>

          <Input
            className="mt-2"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Silk Sarees"
          />

        </div>

        <div>

          <Label>Slug</Label>

          <Input
            className="mt-2"
            value={form.slug}
            readOnly
          />

        </div>

        <div>

          <Label>Description</Label>

          <Textarea
            className="mt-2"
            rows={5}
            name="description"
            value={form.description}
            onChange={handleChange}
          />

        </div>

        <div>

          <Label>Display Order</Label>

          <Input
            className="mt-2 max-w-xs"
            type="number"
            name="display_order"
            value={form.display_order}
            onChange={handleChange}
          />

        </div>

      </div>

    </section>
  );
}