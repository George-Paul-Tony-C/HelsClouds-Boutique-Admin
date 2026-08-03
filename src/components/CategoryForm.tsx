import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { createCategory, updateCategory } from "@/lib/categories";
import { uploadImage } from "@/lib/cloudinary";

import { type Category } from "@/types/category";

interface CategoryFormProps {
  selectedCategory: Category | null;
  onSuccess: () => void;
}

interface FormData {
  name: string;
  slug: string;
  description: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
}

const initialForm: FormData = {
  name: "",
  slug: "",
  description: "",
  image_url: "",
  display_order: 1,
  is_active: true,
};

export default function CategoryForm({
  selectedCategory,
  onSuccess,
}: CategoryFormProps) {
  const [form, setForm] = useState<FormData>(initialForm);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedCategory) {
      setForm(initialForm);
      setPreview("");
      setImageFile(null);
      return;
    }

    setForm({
      name: selectedCategory.name,
      slug: selectedCategory.slug,
      description: selectedCategory.description ?? "",
      image_url: selectedCategory.image_url ?? "",
      display_order: selectedCategory.display_order,
      is_active: selectedCategory.is_active,
    });

    setPreview(selectedCategory.image_url ?? "");

    setImageFile(null);
  }, [selectedCategory]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);

    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      let imageUrl = form.image_url;

      if (imageFile) {
        const result = await uploadImage(imageFile);

        imageUrl = result.secure_url;
      }

      const payload = {
        ...form,
        image_url: imageUrl,
      };

      if (selectedCategory) {
        await updateCategory(selectedCategory.id, payload);
      } else {
        await createCategory(payload);
      }

      setForm(initialForm);
      setPreview("");
      setImageFile(null);

      onSuccess();
    } catch (error) {
      console.error(error);

      alert("Failed to save category.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-white p-6"
    >
      <h2 className="mb-6 text-xl font-semibold">
        {selectedCategory ? "Edit Category" : "Add Category"}
      </h2>

      <div className="space-y-5">

        <div>
          <Label>Category Name</Label>

          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Silk Sarees"
            required
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
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
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

        <div className="flex items-center gap-3">

          <input
            id="active"
            type="checkbox"
            checked={form.is_active}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                is_active: e.target.checked,
              }))
            }
          />

          <Label htmlFor="active">
            Active Category
          </Label>

        </div>

        <div>

          <Label>Category Image</Label>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 mb-3 h-40 w-full rounded-lg border object-cover"
            />
          )}

          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : selectedCategory
            ? "Update Category"
            : "Add Category"}
        </Button>

      </div>
    </form>
  );
}