// File: src/components/products/ProductBasicInfo.tsx

import { useEffect, useState } from "react";

import { getCategories } from "@/lib/categories";

import type { Category } from "@/types/category";
import type { ProductFormData } from "@/types/product";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { error } from "@/lib/toast";
import { getErrorMessage } from "@/lib/error";

interface ProductBasicInfoProps {
  form: ProductFormData;

  setForm: React.Dispatch<
    React.SetStateAction<ProductFormData>
  >;
}

export default function ProductBasicInfo({
  form,
  setForm,
}: ProductBasicInfoProps) {
  const [categories, setCategories] =
    useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
        try {
        const data = await getCategories();

        setCategories(data ?? []);
        } catch (err) {
            console.error(err);

            error(getErrorMessage(err));
        }
    }
    
    loadCategories();
  }, []);


  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setForm((prev) => {
      const updated = {
        ...prev,
        [name]: value,
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

          <Label>Category</Label>

          <select
            className="mt-2 w-full rounded-md border p-2"
            value={form.category_id}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                category_id: e.target.value,
              }))
            }
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}

          </select>

        </div>

        <div>

          <Label>Product Code</Label>

          <Input
            className="mt-2"
            name="product_code"
            value={form.product_code}
            onChange={handleChange}
          />

        </div>

        <div>

          <Label>Product Name</Label>

          <Input
            className="mt-2"
            name="name"
            value={form.name}
            onChange={handleChange}
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

      </div>

    </section>
  );
}