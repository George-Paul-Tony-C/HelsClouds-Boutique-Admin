// File: src/pages/ProductDetails.tsx

import {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  Pencil,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { Button } from "@/components/ui/button";

import {
  getProductById,
} from "@/lib/products";

import {
  getProductImages,
} from "@/lib/product-images";

import {
  error,
} from "@/lib/toast";

import {
  getErrorMessage,
} from "@/lib/error";

import type {
  Product,
  ProductImage,
} from "@/types/product";

export default function ProductDetails() {
  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const [product, setProduct] =
    useState<Product | null>(null);

  const [images, setImages] =
    useState<ProductImage[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!id) return;

    loadProduct();
  }, [id]);

  async function loadProduct() {
    try {
      setLoading(true);

      const [
        productData,
        gallery,
      ] = await Promise.all([
        getProductById(id!),
        getProductImages(id!),
      ]);

      setProduct(productData);

      setImages(gallery);
    } catch (err) {
      console.error(err);

      error(
        getErrorMessage(err)
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        Product not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <Button
          variant="outline"
          onClick={() =>
            navigate(-1)
          }
        >
          <ArrowLeft
            size={18}
            className="mr-2"
          />

          Back

        </Button>

        <Button
          onClick={() =>
            navigate(
              `/products/${product.id}/edit`
            )
          }
        >

          <Pencil
            size={18}
            className="mr-2"
          />

          Edit Product

        </Button>

      </div>

      <section className="rounded-xl border bg-white p-6">

        <div className="grid gap-8 lg:grid-cols-[350px_1fr]">

          <div>

            {product.featured_image_url ? (

              <img
                src={
                  product.featured_image_url
                }
                alt={product.name}
                className="aspect-square w-full rounded-xl border object-cover"
              />

            ) : (

              <div className="flex aspect-square items-center justify-center rounded-xl border bg-slate-100">

                No Image

              </div>

            )}

          </div>

          <div className="space-y-5">

            <div>

              <h1 className="text-3xl font-bold">
                {product.name}
              </h1>

              <p className="text-slate-500">
                {product.product_code}
              </p>

            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              <div>

                <div className="text-sm text-slate-500">
                  Selling Price
                </div>

                <div className="text-xl font-semibold">
                  ₹
                  {Number(
                    product.selling_price
                  ).toLocaleString(
                    "en-IN"
                  )}
                </div>

              </div>

              <div>

                <div className="text-sm text-slate-500">
                  Cost Price
                </div>

                <div className="text-xl font-semibold">
                  ₹
                  {Number(
                    product.cost_price
                  ).toLocaleString(
                    "en-IN"
                  )}
                </div>

              </div>

              <div>

                <div className="text-sm text-slate-500">
                  Material
                </div>

                <div className="font-medium">
                  {product.material ||
                    "-"}
                </div>

              </div>

              <div>

                <div className="text-sm text-slate-500">
                  Color
                </div>

                <div className="font-medium">
                  {product.color ||
                    "-"}
                </div>

              </div>

              <div>

                <div className="text-sm text-slate-500">
                  Display Order
                </div>

                <div className="font-medium">
                  {product.display_order}
                </div>

              </div>

              <div>

                <div className="text-sm text-slate-500">
                  Status
                </div>

                <div className="font-medium">
                  {product.is_available
                    ? "Active"
                    : "Inactive"}
                </div>

              </div>

            </div>

            <div>

              <div className="mb-2 text-sm text-slate-500">
                Description
              </div>

              <p className="leading-7 text-slate-700">
                {product.description ||
                  "No description available."}
              </p>

            </div>

          </div>

        </div>

      </section>

      <section className="rounded-xl border bg-white p-6">

        <h2 className="mb-6 text-xl font-semibold">
          Gallery Images
        </h2>

        {images.length === 0 ? (

          <div className="rounded-lg border border-dashed py-12 text-center text-slate-500">

            No gallery images.

          </div>

        ) : (

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {images.map((image) => (

              <img
                key={image.id}
                src={image.image_url}
                alt=""
                className="aspect-square rounded-xl border object-cover"
              />

            ))}

          </div>

        )}

      </section>

    </div>
  );
}