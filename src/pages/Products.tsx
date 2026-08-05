// File: src/pages/Products.tsx

import { useEffect, useState } from "react";

import {
  Pencil,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  deleteProduct,
  getProducts,
} from "@/lib/products";

import {
  error,
  success,
} from "@/lib/toast";

import { getErrorMessage } from "@/lib/error";

import type { Product } from "@/types/product";

const PAGE_SIZE = 10;

export default function Products() {
  const navigate = useNavigate();

  const [products, setProducts] =
    useState<Product[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [page, setPage] =
    useState(1);

  const [total, setTotal] =
    useState(0);

  const totalPages = Math.max(
    1,
    Math.ceil(total / PAGE_SIZE)
  );

  useEffect(() => {
    loadProducts();
  }, [page]);

  async function loadProducts() {
    try {
      setLoading(true);

      const result =
        await getProducts(page);

      setProducts(result.data);

      setTotal(result.total);
    } catch (err) {
      console.error(err);

      error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(
    id: string
  ) {
    if (
      !window.confirm(
        "Delete this product?"
      )
    ) {
      return;
    }

    try {
      await deleteProduct(id);

      success(
        "Product deleted successfully."
      );

      await loadProducts();
    } catch (err) {
      console.error(err);

      error(getErrorMessage(err));
    }
  }

  const filteredProducts =
    products.filter(
      (product) =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.product_code
          .toLowerCase()
          .includes(search.toLowerCase())
    );

  return (
    <section className="rounded-xl border bg-white p-4 md:p-6">

      {/* Header */}

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            Products
          </h1>

          <p className="text-sm text-slate-500">
            Manage boutique products.
          </p>

        </div>

        <Button
          onClick={() =>
            navigate("/products/new")
          }
        >

          <Plus
            size={18}
            className="mr-2"
          />

          Add Product

        </Button>

      </div>

      <Input
        placeholder="Search products..."
        className="mb-6"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {/* Responsive Table */}

      <div className="overflow-x-auto rounded-lg border">

        <table className="min-w-[900px] w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-4 py-3 text-left">
                Image
              </th>

              <th className="px-4 py-3 text-left">
                Code
              </th>

              <th className="px-4 py-3 text-left">
                Product
              </th>

              <th className="px-4 py-3 text-left">
                Price
              </th>

              <th className="px-4 py-3 text-left">
                Status
              </th>

              <th className="px-4 py-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan={6}
                  className="py-12 text-center"
                >
                  Loading...
                </td>

              </tr>

            ) : filteredProducts.length ===
              0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="py-12 text-center text-slate-500"
                >
                  No products found.
                </td>

              </tr>

            ) : (

              filteredProducts.map(
                (product) => (

                  <tr
                    key={product.id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="px-4 py-3">

                      {product.featured_image_url ? (

                        <img
                          src={
                            product.featured_image_url
                          }
                          alt={product.name}
                          className="h-14 w-14 rounded-lg object-cover"
                        />

                      ) : (

                        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-slate-200 text-xs">
                          No Image
                        </div>

                      )}

                    </td>

                    <td className="px-4 py-3">
                      {product.product_code}
                    </td>

                    <td className="px-4 py-3">

                      <div className="font-medium">
                        {product.name}
                      </div>

                      <div className="text-xs text-slate-500">
                        {product.slug}
                      </div>

                    </td>

                    <td className="px-4 py-3">

                      ₹
                      {Number(
                        product.selling_price
                      ).toLocaleString(
                        "en-IN",
                        {
                          minimumFractionDigits: 2,
                        }
                      )}

                    </td>

                    <td className="px-4 py-3">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          product.is_available
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.is_available
                          ? "Active"
                          : "Inactive"}
                      </span>

                    </td>

                    <td className="px-4 py-3">

                      <div className="flex justify-center gap-2">

                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() =>
                            navigate(
                              `/products/${product.id}/edit`
                            )
                          }
                        >

                          <Pencil
                            size={16}
                          />

                        </Button>

                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() =>
                            handleDelete(
                              product.id
                            )
                          }
                        >

                          <Trash2
                            size={16}
                          />

                        </Button>

                      </div>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

      {/* Footer */}

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <p className="text-sm text-slate-500">

          Showing{" "}

          {(page - 1) * PAGE_SIZE + 1}

          -

          {Math.min(
            page * PAGE_SIZE,
            total
          )}

          {" "}of {total} products

        </p>

        <div className="flex items-center gap-2">

          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() =>
              setPage(
                (p) => p - 1
              )
            }
          >

            <ChevronLeft
              size={18}
            />

          </Button>

          <span className="px-4 text-sm font-medium">

            {page} / {totalPages}

          </span>

          <Button
            variant="outline"
            disabled={
              page === totalPages
            }
            onClick={() =>
              setPage(
                (p) => p + 1
              )
            }
          >

            <ChevronRight
              size={18}
            />

          </Button>

        </div>

      </div>

    </section>
  );
}