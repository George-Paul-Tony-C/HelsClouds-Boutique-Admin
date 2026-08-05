// File: src/pages/Categories.tsx

import { useEffect, useState } from "react";

import {
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  deleteCategory,
  getCategories,
} from "@/lib/categories";

import { error, success } from "@/lib/toast";
import { getErrorMessage } from "@/lib/error";

import type { Category } from "@/types/category";

export default function Categories() {
  const navigate = useNavigate();

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      setLoading(true);

      const data =
        await getCategories();

      setCategories(data ?? []);
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
        "Delete this category?"
      )
    ) {
      return;
    }

    try {
      await deleteCategory(id);

      success(
        "Category deleted successfully."
      );

      await loadCategories();
    } catch (err) {
      console.error(err);

      error(getErrorMessage(err));
    }
  }

  const filtered =
    categories.filter(
      (category) =>
        category.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        category.slug
          .toLowerCase()
          .includes(search.toLowerCase())
    );

  return (
    <div>

      <section className="rounded-xl border bg-white p-6">

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <h1 className="text-2xl font-bold">
              Categories
            </h1>

            <p className="text-sm text-slate-500">
              Manage boutique categories.
            </p>

          </div>

          <Button
            onClick={() =>
              navigate(
                "/categories/new"
              )
            }
          >

            <Plus
              size={18}
              className="mr-2"
            />

            Add Category

          </Button>

        </div>

        <Input
          className="mb-6"
          placeholder="Search category..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <div className="overflow-x-auto rounded-lg border">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="px-4 py-3 text-left">
                  Image
                </th>

                <th className="px-4 py-3 text-left">
                  Name
                </th>

                <th className="px-4 py-3 text-left">
                  Order
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
                    colSpan={5}
                    className="py-10 text-center"
                  >
                    Loading...
                  </td>

                </tr>

              ) : filtered.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="py-10 text-center text-slate-500"
                  >
                    No categories found.
                  </td>

                </tr>

              ) : (

                filtered.map(
                  (category) => (

                    <tr
                      key={
                        category.id
                      }
                      className="border-t hover:bg-slate-50"
                    >

                      <td className="px-4 py-3">

                        {category.image_url ? (

                          <img
                            src={
                              category.image_url
                            }
                            alt={
                              category.name
                            }
                            className="h-14 w-14 rounded-lg object-cover"
                          />

                        ) : (

                          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-slate-200 text-xs">
                            No Image
                          </div>

                        )}

                      </td>

                      <td className="px-4 py-3">

                        <div className="font-medium">
                          {
                            category.name
                          }
                        </div>

                        <div className="text-xs text-slate-500">
                          {
                            category.slug
                          }
                        </div>

                      </td>

                      <td className="px-4 py-3">
                        {
                          category.display_order
                        }
                      </td>

                      <td className="px-4 py-3">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            category.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {category.is_active
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
                                `/categories/${category.id}/edit`
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
                                category.id
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

    </div>
  );
}