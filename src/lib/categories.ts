// File: src/lib/categories.ts

import { supabase } from "./supabase";

import type { Category, CategoryFormData } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;

  return (data ?? []) as Category[];
}

export async function getCategoryById(
  id: string
): Promise<Category | null> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Category;
}

export async function createCategory(
  category: CategoryFormData
) {
  const { error } = await supabase
    .from("categories")
    .insert({
      name: category.name,
      slug: category.slug,
      description: category.description,
      image_url: category.image_url,
      display_order: category.display_order,
      is_active: category.is_active,
    });

  if (error) throw error;
}

export async function updateCategory(
  id: string,
  category: CategoryFormData
) {
  const { error } = await supabase
    .from("categories")
    .update({
      name: category.name,
      slug: category.slug,
      description: category.description,
      image_url: category.image_url,
      display_order: category.display_order,
      is_active: category.is_active,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteCategory(
  id: string
) {
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) throw error;
}