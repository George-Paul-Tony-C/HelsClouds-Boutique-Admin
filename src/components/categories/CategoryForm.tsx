// File: src/components/categories/CategoryForm.tsx

import { useEffect, useState } from "react";

import {
  createCategory,
  updateCategory,
} from "@/lib/categories";

import { uploadImage } from "@/lib/cloudinary";

import {
  error,
  success,
} from "@/lib/toast";

import { getErrorMessage } from "@/lib/error";

import type {
  Category,
  CategoryFormData,
} from "@/types/category";

import CategoryBasicInfo from "./CategoryBasicInfo";
import CategoryImageUpload from "./CategoryImageUpload";
import CategoryOptions from "./CategoryOptions";

import { Button } from "@/components/ui/button";

interface CategoryFormProps {
  mode: "create" | "edit";

  category?: Category;

  onSuccess: () => void;
}

const initialForm: CategoryFormData = {
  name: "",
  slug: "",
  description: "",

  image_url: "",

  display_order: 1,

  is_active: true,
};

export default function CategoryForm({
  mode,
  category,
  onSuccess,
}: CategoryFormProps) {
  const [form, setForm] =
    useState<CategoryFormData>(
      initialForm
    );

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!category) return;

    setForm({
      name: category.name,

      slug: category.slug,

      description:
        category.description ?? "",

      image_url:
        category.image_url ?? "",

      display_order:
        category.display_order,

      is_active:
        category.is_active,
    });

    setPreview(
      category.image_url ?? ""
    );
  }, [category]);

  async function handleSubmit() {
    try {
      setLoading(true);

      let imageUrl =
        form.image_url;

      /*
       * Upload Image
       */

      if (imageFile) {
        const upload =
          await uploadImage(imageFile);

        imageUrl =
          upload.secure_url;
      }

      const payload = {
        ...form,

        image_url: imageUrl,
      };

      /*
       * Save
       */

      if (mode === "create") {
        await createCategory(payload);

        success(
          "Category created successfully."
        );
      } else {
        await updateCategory(
          category!.id,
          payload
        );

        success(
          "Category updated successfully."
        );
      }

      onSuccess();
    } catch (err) {
      console.error(err);

      error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">

      <CategoryBasicInfo
        form={form}
        setForm={setForm}
      />

      <CategoryImageUpload
        preview={preview}
        onFileChange={(
          file,
          imagePreview
        ) => {
          setImageFile(file);

          setPreview(imagePreview);
        }}
      />

      <CategoryOptions
        form={form}
        setForm={setForm}
      />

      <Button
        className="w-full"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading
          ? "Saving..."
          : mode === "create"
          ? "Create Category"
          : "Update Category"}
      </Button>

    </div>
  );
}