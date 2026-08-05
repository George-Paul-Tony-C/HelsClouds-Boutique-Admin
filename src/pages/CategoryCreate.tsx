// File: src/pages/CategoryCreate.tsx

import { useNavigate } from "react-router-dom";

import CategoryForm from "@/components/categories/CategoryForm";

export default function CategoryCreate() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-5xl">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Add Category
        </h1>

        <p className="text-slate-500">
          Create a new boutique category.
        </p>

      </div>

      <CategoryForm
        mode="create"
        onSuccess={() => {
          navigate("/categories");
        }}
      />

    </div>
  );
}