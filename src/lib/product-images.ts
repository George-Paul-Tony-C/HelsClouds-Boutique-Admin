// File: src/lib/product-images.ts

import { supabase } from "./supabase";

import type { ProductImage } from "@/types/product";

export async function getProductImages(
  productId: string
): Promise<ProductImage[]> {
  const { data, error } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", productId)
    .order("display_order", {
      ascending: true,
    });

  if (error) throw error;

  return (data ?? []) as ProductImage[];
}

export async function addProductImage(
  productId: string,
  imageUrl: string,
  cloudinaryPublicId: string,
  displayOrder: number = 1
) {
  const { error } = await supabase
    .from("product_images")
    .insert({
      product_id: productId,
      image_url: imageUrl,
      cloudinary_public_id: cloudinaryPublicId,
      display_order: displayOrder,
      is_primary: false,
    });

  if (error) throw error;
}

export async function updateProductImage(
  id: string,
  imageUrl: string,
  cloudinaryPublicId: string
) {
  const { error } = await supabase
    .from("product_images")
    .update({
      image_url: imageUrl,
      cloudinary_public_id: cloudinaryPublicId,
    })
    .eq("id", id);

  if (error) throw error;
}

export async function updateImageDisplayOrder(
  id: string,
  displayOrder: number
) {
  const { error } = await supabase
    .from("product_images")
    .update({
      display_order: displayOrder,
    })
    .eq("id", id);

  if (error) throw error;
}

export async function setPrimaryImage(
  productId: string,
  imageId: string
) {
  const { error: resetError } = await supabase
    .from("product_images")
    .update({
      is_primary: false,
    })
    .eq("product_id", productId);

  if (resetError) throw resetError;

  const { error } = await supabase
    .from("product_images")
    .update({
      is_primary: true,
    })
    .eq("id", imageId);

  if (error) throw error;
}

export async function deleteProductImage(
  id: string
) {
  const { error } = await supabase
    .from("product_images")
    .delete()
    .eq("id", id);

  if (error) throw error;
}