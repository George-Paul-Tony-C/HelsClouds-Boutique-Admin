// File: src/lib/products.ts

import { supabase } from "./supabase";

import type {
  Product,
  ProductFormData,
} from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        name
      )
    `)
    .order("display_order", {
      ascending: true,
    });

  if (error) throw error;

  return (data ?? []) as Product[];
}

export async function getProductById(
  id: string
): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Product;
}

export async function createProduct(
  product: ProductFormData
): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .insert({
      product_code: product.product_code,
      name: product.name,
      slug: product.slug,
      description: product.description,

      cost_price: product.cost_price,
      selling_price: product.selling_price,

      category_id: product.category_id,

      material: product.material,
      color: product.color,

      featured_image_url:
        product.featured_image_url,

      is_best_seller:
        product.is_best_seller,

      is_new_arrival:
        product.is_new_arrival,

      is_featured:
        product.is_featured,

      display_order:
        product.display_order,

      is_active:
        product.is_active,
    })
    .select()
    .single();

  if (error) throw error;

  return data as Product;
}

export async function updateProduct(
  id: string,
  product: ProductFormData
): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .update({
      product_code:
        product.product_code,

      name:
        product.name,

      slug:
        product.slug,

      description:
        product.description,

      cost_price:
        product.cost_price,

      selling_price:
        product.selling_price,

      category_id:
        product.category_id,

      material:
        product.material,

      color:
        product.color,

      featured_image_url:
        product.featured_image_url,

      is_best_seller:
        product.is_best_seller,

      is_new_arrival:
        product.is_new_arrival,

      is_featured:
        product.is_featured,

      display_order:
        product.display_order,

      is_active:
        product.is_active,

      updated_at:
        new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data as Product;
}

export async function deleteProduct(
  id: string
) {
  // Delete gallery image records first
  const { error: imageError } =
    await supabase
      .from("product_images")
      .delete()
      .eq("product_id", id);

  if (imageError) throw imageError;

  // Delete product
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) throw error;
}