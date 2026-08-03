import { useEffect, useState } from "react";

import { uploadImage } from "@/lib/cloudinary";

import {
  createProduct,
  updateProduct,
} from "@/lib/products";

import { getCategories } from "@/lib/categories";

import type {
  Product,
  ProductFormData,
} from "@/types/product";

import type { Category } from "@/types/category";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProductFormProps {
  selectedProduct: Product | null;
  onSuccess: (product: Product) => void;
}


const initialForm: ProductFormData = {
  product_code: "",
  name: "",
  slug: "",
  description: "",

  cost_price: 0,
  selling_price: 0,

  category_id: "",

  material: "",
  color: "",

  featured_image_url: "",

  is_best_seller: false,
  is_new_arrival: false,
  is_featured: false,

  display_order: 1,

  is_active: true,
};

export default function ProductForm({
  selectedProduct,
  onSuccess,
}: ProductFormProps) {
  const [form, setForm] =
    useState<ProductFormData>(initialForm);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    async function loadCategories() {
        try {
        const data =
            await getCategories();

        setCategories(data);
        } catch (error) {
        console.error(error);
        }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    if (!selectedProduct) {
      setForm(initialForm);
      setPreview("");
      setImageFile(null);
      return;
    }

    setForm({
      product_code:
        selectedProduct.product_code,

      name:
        selectedProduct.name,

      slug:
        selectedProduct.slug,

      description:
        selectedProduct.description ?? "",

      cost_price:
        selectedProduct.cost_price,

      selling_price:
        selectedProduct.selling_price,

      category_id:
        selectedProduct.category_id,

      material:
        selectedProduct.material ?? "",

      color:
        selectedProduct.color ?? "",

      featured_image_url:
        selectedProduct.featured_image_url ??
        "",

      is_best_seller:
        selectedProduct.is_best_seller,

      is_new_arrival:
        selectedProduct.is_new_arrival,

      is_featured:
        selectedProduct.is_featured,

      display_order:
        selectedProduct.display_order,

      is_active:
        selectedProduct.is_active,
    });

    setPreview(
      selectedProduct.featured_image_url ??
        ""
    );

    setImageFile(null);
  }, [selectedProduct]);

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
          name === "cost_price" ||
          name === "selling_price" ||
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

  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    setImageFile(file);

    setPreview(
      URL.createObjectURL(file)
    );
  }

  return (
    <form className="rounded-xl border bg-white p-6">

      <h2 className="mb-6 text-xl font-semibold">
        {selectedProduct
          ? "Edit Product"
          : "Add Product"}
      </h2>

      <div className="space-y-5">

        <div>

          <Label>Category</Label>

          <select
            className="w-full rounded-md border p-2"
            value={form.category_id}
            onChange={(e) =>
              setForm({
                ...form,
                category_id:
                  e.target.value,
              })
            }
          >
            <option value="">
              Select Category
            </option>

            {categories.map(
              (category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              )
            )}
          </select>

        </div>

        <div>

          <Label>Product Code</Label>

          <Input
            name="product_code"
            value={form.product_code}
            onChange={handleChange}
          />

        </div>

        <div>

          <Label>Product Name</Label>

          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
          />

        </div>

        <div>

          <Label>Slug</Label>

          <Input
            value={form.slug}
            readOnly
          />

        </div>

        <div>

          <Label>Description</Label>

          <Textarea
            rows={5}
            name="description"
            value={form.description}
            onChange={handleChange}
          />

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>

            <Label>
              Cost Price
            </Label>

            <Input
              type="number"
              name="cost_price"
              value={form.cost_price}
              onChange={handleChange}
            />

          </div>

          <div>

            <Label>
              Selling Price
            </Label>

            <Input
              type="number"
              name="selling_price"
              value={
                form.selling_price
              }
              onChange={handleChange}
            />

          </div>

        </div>
                <div>

          <Label>Material</Label>

          <Input
            name="material"
            value={form.material}
            onChange={handleChange}
          />

        </div>

        <div>

          <Label>Color</Label>

          <Input
            name="color"
            value={form.color}
            onChange={handleChange}
          />

        </div>

        <div>

          <Label>Display Order</Label>

          <Input
            type="number"
            name="display_order"
            value={form.display_order}
            onChange={handleChange}
          />

        </div>

        <div>

          <Label>Featured Image</Label>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mb-3 mt-2 h-48 w-full rounded-lg border object-cover"
            />
          )}

          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

        </div>

        <div className="space-y-3 rounded-lg border p-4">

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={form.is_best_seller}
              onChange={(e) =>
                setForm({
                  ...form,
                  is_best_seller:
                    e.target.checked,
                })
              }
            />

            Best Seller

          </label>

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={form.is_new_arrival}
              onChange={(e) =>
                setForm({
                  ...form,
                  is_new_arrival:
                    e.target.checked,
                })
              }
            />

            New Arrival

          </label>

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={form.is_featured}
              onChange={(e) =>
                setForm({
                  ...form,
                  is_featured:
                    e.target.checked,
                })
              }
            />

            Featured Product

          </label>

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) =>
                setForm({
                  ...form,
                  is_active:
                    e.target.checked,
                })
              }
            />

            Active

          </label>

        </div>

        <Button
          type="button"
          className="w-full"
          disabled={loading}
          onClick={async () => {

            try {

              setLoading(true);

              let imageUrl =
                form.featured_image_url;

              if (imageFile) {

                const upload =
                  await uploadImage(
                    imageFile
                  );

                imageUrl =
                  upload.secure_url;
              }

              const payload = {
                ...form,
                featured_image_url:
                  imageUrl,
              };

              if (selectedProduct) {

                await updateProduct(
                  selectedProduct.id,
                  payload
                );

              } else {

                await createProduct(
                  payload
                );

              }

              setForm(initialForm);

              setPreview("");

              setImageFile(null);

              onSuccess();

            } catch (error) {

              console.error(error);

              alert(
                "Failed to save product."
              );

            } finally {

              setLoading(false);

            }

          }}
        >

          {loading
            ? "Saving Product..."
            : selectedProduct
            ? "Update Product"
            : "Add Product"}

        </Button>

      </div>

    </form>
  );
}