// File: src/pages/Products.tsx

import { useEffect, useState } from "react";

import { Pencil, Trash2 } from "lucide-react";

import ProductForm from "@/components/ProductForm";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  deleteProduct,
  getProducts,
} from "@/lib/products";

import type { Product } from "@/types/product";
import ProductImages from "@/components/ProductImages";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data ?? []);
    } catch (error) {
      console.error(error);

      alert("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Delete this product?"
    );

    if (!confirmed) return;

    try {
      await deleteProduct(id);

      if (selectedProduct?.id === id) {
        setSelectedProduct(null);
      }

      await loadProducts();
    } catch (error) {
      console.error(error);

      alert("Failed to delete product.");
    }
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.product_code
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_450px]">

      {/* LEFT */}

      <section className="rounded-xl border bg-white p-6">

        <div className="mb-6 flex items-center justify-between">

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
              setSelectedProduct(null)
            }
          >
            + Add Product
          </Button>

        </div>

        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="mb-6"
        />

        <div className="overflow-hidden rounded-lg border">

          <table className="w-full">

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
                    className="py-10 text-center"
                  >
                    Loading...
                  </td>

                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>

                  <td
                    colSpan={6}
                    className="py-10 text-center text-slate-500"
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
                        {product.selling_price.toFixed(
                          2
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
                              setSelectedProduct(
                                product
                              )
                            }
                          >
                            <Pencil size={16} />
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
                            <Trash2 size={16} />
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

      </section>

      {/* RIGHT */}

      <div className="space-y-6">

        <ProductForm
            selectedProduct={selectedProduct}
            onSuccess={async (product) => {
                setSelectedProduct(product);

                await loadProducts();
            }}
        />

        {selectedProduct && (
            <ProductImages
                productId={selectedProduct.id}
            />
        )}

    </div>

    </div>
  );
}