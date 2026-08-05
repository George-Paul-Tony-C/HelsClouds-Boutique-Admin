// File: src/pages/CategoryEdit.tsx

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import CategoryForm from "@/components/categories/CategoryForm";

import { getCategoryById } from "@/lib/categories";

import { error } from "@/lib/toast";
import { getErrorMessage } from "@/lib/error";

import type { Category } from "@/types/category";

export default function CategoryEdit() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [category, setCategory] =
    useState<Category | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!id) {
      navigate("/categories", {
        replace: true,
      });

      return;
    }

    loadCategory(id);
  }, [id]);

  async function loadCategory(
    categoryId: string
  ) {
    try {
      setLoading(true);

      const data =
        await getCategoryById(categoryId);

      if (!data) {
        navigate("/categories", {
          replace: true,
        });

        return;
      }

      setCategory(data);
    } catch (err) {
      console.error(err);

      error(getErrorMessage(err));

      navigate("/categories", {
        replace: true,
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center">
        Loading Category...
      </div>
    );
  }

  if (!category) {
    return null;
  }

  return (
    <div className="mx-auto max-w-5xl">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Edit Category
        </h1>

        <p className="text-slate-500">
          Update category details.
        </p>

      </div>

      <CategoryForm
        mode="edit"
        category={category}
        onSuccess={() => {
          navigate("/categories");
        }}
      />

    </div>
  );
}