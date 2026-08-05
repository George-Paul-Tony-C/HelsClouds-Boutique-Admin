// File: src/pages/ProductCreate.tsx

import { useNavigate } from "react-router-dom";

import ProductForm from "@/components/products/ProductForm";

export default function ProductCreate() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-7xl">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Add Product
        </h1>

        <p className="text-slate-500">
          Create a new boutique product.
        </p>

      </div>

      <ProductForm
        mode="create"
        onSuccess={() => {
          navigate("/products");
        }}
      />

    </div>
  );
}