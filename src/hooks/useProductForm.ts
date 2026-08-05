// File: src/hooks/useProductForm.ts

import { useEffect, useState } from "react";

import {
  getProductImages,
} from "@/lib/product-images";

import type {
  Product,
  ProductFormData,
  ProductImage,
} from "@/types/product";

const initialForm: ProductFormData = {
  product_code: "",

  name: "",

  slug: "",

  description: "",

  category_id: "",

  cost_price: 0,

  selling_price: 0,

  material: "",

  color: "",

  featured_image_url: "",

  display_order: 1,

  is_best_seller: false,

  is_new_arrival: false,

  is_featured: false,

  is_available: true,
};

export function useProductForm(
  product?: Product
) {
  const [form, setForm] =
    useState<ProductFormData>(
      initialForm
    );

  const [featuredImage, setFeaturedImage] =
    useState<File | null>(null);

  const [featuredPreview, setFeaturedPreview] =
    useState("");

  const [galleryFiles, setGalleryFiles] =
    useState<File[]>([]);

  const [galleryImages, setGalleryImages] =
    useState<ProductImage[]>([]);

  const [removedImages, setRemovedImages] =
    useState<string[]>([]);

  const [loadingImages, setLoadingImages] =
    useState(false);

  useEffect(() => {
    if (!product) return;

    setForm({
      product_code:
        product.product_code,

      name:
        product.name,

      slug:
        product.slug,

      description:
        product.description ?? "",

      category_id:
        product.category_id,

      cost_price:
        product.cost_price,

      selling_price:
        product.selling_price,

      material:
        product.material ?? "",

      color:
        product.color ?? "",

      featured_image_url:
        product.featured_image_url ?? "",

      display_order:
        product.display_order,

      is_best_seller:
        product.is_best_seller,

      is_new_arrival:
        product.is_new_arrival,

      is_featured:
        product.is_featured,

      is_available:
        product.is_available,
    });

    setFeaturedPreview(
      product.featured_image_url ?? ""
    );
  }, [product]);

  useEffect(() => {
    async function loadGallery() {
      if (!product) return;

      try {
        setLoadingImages(true);

        const images =
          await getProductImages(
            product.id
          );

        setGalleryImages(images);
      } finally {
        setLoadingImages(false);
      }
    }

    loadGallery();
  }, [product]);

  function removeGalleryImage(
    id: string
  ) {
    setGalleryImages((prev) =>
      prev.filter(
        (image) =>
          image.id !== id
      )
    );

    setRemovedImages((prev) => [
      ...prev,
      id,
    ]);
  }

  function resetForm() {
    setForm(initialForm);

    setFeaturedImage(null);

    setFeaturedPreview("");

    setGalleryFiles([]);

    setGalleryImages([]);

    setRemovedImages([]);
  }

  return {
    form,

    setForm,

    featuredImage,

    setFeaturedImage,

    featuredPreview,

    setFeaturedPreview,

    galleryFiles,

    setGalleryFiles,

    galleryImages,

    setGalleryImages,

    removedImages,

    loadingImages,

    removeGalleryImage,

    resetForm,
  };
}