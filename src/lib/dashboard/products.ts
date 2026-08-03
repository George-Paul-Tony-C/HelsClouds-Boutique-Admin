// File: src/lib/dashboard/products.ts

import { supabase } from "@/lib/supabase";

import type {
  TopCategory,
  TopProduct,
} from "@/types/dashboard";

export async function getTopProducts(): Promise<TopProduct[]> {
  const { data, error } = await supabase
    .from("order_items")
    .select(`
      quantity,
      total_price,
      product:products(
        id,
        name,
        product_code,
        featured_image_url,
        selling_price,
        cost_price
      )
    `);

  if (error) throw error;

  const map = new Map<string, TopProduct>();

  data.forEach((item: any) => {
    if (!item.product) return;

    const id = item.product.id;

    const quantity = Number(item.quantity);

    const revenue = Number(item.total_price);

    const profit =
      (Number(item.product.selling_price) -
        Number(item.product.cost_price)) *
      quantity;

    if (!map.has(id)) {
      map.set(id, {
        product_id: id,

        product_name: item.product.name,

        product_code: item.product.product_code,

        featured_image_url:
          item.product.featured_image_url,

        quantity_sold: quantity,

        revenue,

        profit,
      });

      return;
    }

    const existing = map.get(id)!;

    existing.quantity_sold += quantity;

    existing.revenue += revenue;

    existing.profit += profit;
  });

  return [...map.values()]
    .sort(
      (a, b) =>
        b.quantity_sold -
        a.quantity_sold
    )
    .slice(0, 10);
}

export async function getTopCategories(): Promise<TopCategory[]> {
  const { data, error } = await supabase
    .from("order_items")
    .select(`
      quantity,
      total_price,
      product:products(
        category_id,
        category:categories(
          id,
          name
        )
      )
    `);

  if (error) throw error;

  const map = new Map<string, TopCategory>();

  data.forEach((item: any) => {
    if (
      !item.product ||
      !item.product.category
    )
      return;

    const category =
      item.product.category;

    const quantity =
      Number(item.quantity);

    const revenue =
      Number(item.total_price);

    if (!map.has(category.id)) {
      map.set(category.id, {
        category_id: category.id,

        category_name:
          category.name,

        quantity_sold:
          quantity,

        revenue,
      });

      return;
    }

    const existing =
      map.get(category.id)!;

    existing.quantity_sold +=
      quantity;

    existing.revenue += revenue;
  });

  return [...map.values()]
    .sort(
      (a, b) =>
        b.quantity_sold -
        a.quantity_sold
    )
    .slice(0, 10);
}