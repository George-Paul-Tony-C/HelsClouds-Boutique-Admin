// File: src/pages/ProductEdit.tsx

import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import ProductForm from "@/components/products/ProductForm";

import { getProductById } from "@/lib/products";

import type { Product } from "@/types/product";
import { error } from "@/lib/toast";
import { getErrorMessage } from "@/lib/error";

export default function ProductEdit() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!id) {
      navigate("/products", {
        replace: true,
      });

      return;
    }

    async function loadProduct(
      productId: string
    ) {
      try {
        setLoading(true);
  
        const data =
          await getProductById(productId);
  
        if (!data) {
          navigate("/products", {
            replace: true,
          });
  
          return;
        }
  
        setProduct(data);
      } catch (err) {
          console.error(err);

          error(getErrorMessage(err));

          navigate("/products", {
            replace: true,
          });
      } finally {
        setLoading(false);
      }
    }
    
    loadProduct(id);
  }, [id]);


  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Edit Product
        </h1>

        <p className="text-slate-500">
          Update your product information.
        </p>

      </div>

      <ProductForm
        mode="edit"
        product={product}
        onSuccess={() => {
          navigate("/products");
        }}
      />

    </div>
  );
}