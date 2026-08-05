// File: src/components/products/ProductForm.tsx

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  createProduct,
  updateProduct,
} from "@/lib/products";

import {
  addProductImage,
  deleteProductImage,
  getProductImages,
} from "@/lib/product-images";

import { uploadImage } from "@/lib/cloudinary";

import type {
  Product,
  ProductFormData,
  ProductImage,
} from "@/types/product";

import ProductBasicInfo from "./ProductBasicInfo";
import ProductPricing from "./ProductPricing";
import ProductDetails from "./ProductDetails";
import FeaturedImageUpload from "./FeaturedImageUpload";
import ProductGalleryUpload from "./ProductGalleryUpload";
import ProductOptions from "./ProductOptions";

import { Button } from "@/components/ui/button";

import { error } from "@/lib/toast";
import { getErrorMessage } from "@/lib/error";

interface ProductFormProps {
  mode: "create" | "edit";

  product?: Product;

  onSuccess: () => void;
}

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

export default function ProductForm({
  mode,
  product,
  onSuccess,
}: ProductFormProps) {
  const navigate = useNavigate();

  const [form, setForm] =
    useState<ProductFormData>(initialForm);

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

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!product) return;

    setForm({
      product_code: product.product_code,
      name: product.name,
      slug: product.slug,
      description:
        product.description ?? "",

      category_id: product.category_id,

      cost_price: product.cost_price,
      selling_price:
        product.selling_price,

      material:
        product.material ?? "",

      color:
        product.color ?? "",

      featured_image_url:
        product.featured_image_url ??
        "",

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
      product.featured_image_url ??
        ""
    );
  }, [product]);

  useEffect(() => {
    async function loadGallery() {
      if (!product) return;

      try {
        const images =
          await getProductImages(
            product.id
          );

        setGalleryImages(images);
      } catch (err) {
        console.error(err);

        error(
          getErrorMessage(err)
        );
      }
    }

    loadGallery();
  }, [product]);

    async function handleSubmit() {
    try {
      setLoading(true);

      if (
        mode === "create" &&
        !featuredImage
      ) {
        error(
          "Please upload a featured image."
        );

        return;
      }

      let featuredUrl =
        form.featured_image_url;

      /*
       * Upload Featured Image
       */

      if (featuredImage) {
        const upload =
          await uploadImage(
            featuredImage
          );

        featuredUrl =
          upload.secure_url;
      }

      const payload: ProductFormData = {
        ...form,

        featured_image_url:
          featuredUrl,
      };

      /*
       * Create / Update Product
       */

      let savedProduct: Product;

      if (mode === "create") {
        savedProduct =
          await createProduct(payload);
      } else {
        savedProduct =
          await updateProduct(
            product!.id,
            payload
          );
      }

      /*
       * Upload Gallery Images
       */

      await Promise.all(
        galleryFiles.map(
          async (
            file,
            index
          ) => {
            const upload =
              await uploadImage(
                file
              );

            await addProductImage(
              savedProduct.id,
              upload.secure_url,
              upload.public_id,
              index + 1
            );
          }
        )
      );

      /*
       * Delete Removed Images
       */

      await Promise.all(
        removedImages.map((id) =>
          deleteProductImage(id)
        )
      );

      onSuccess();

      navigate("/products");
    } catch (err) {
      console.error(err);

      error(
        getErrorMessage(err)
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">

      <ProductBasicInfo
        form={form}
        setForm={setForm}
      />

      <ProductPricing
        form={form}
        setForm={setForm}
      />

      <ProductDetails
        form={form}
        setForm={setForm}
      />

      <FeaturedImageUpload
        preview={featuredPreview}
        onFileChange={(
          file,
          preview
        ) => {
          setFeaturedImage(file);

          setFeaturedPreview(
            preview
          );
        }}
        onRemove={() => {
          setFeaturedImage(
            null
          );

          setFeaturedPreview(
            ""
          );

          setForm((prev) => ({
            ...prev,

            featured_image_url:
              "",
          }));
        }}
      />

      <ProductGalleryUpload
        images={galleryImages}
        files={galleryFiles}
        setFiles={setGalleryFiles}
        onDelete={(id) => {
          setGalleryImages(
            (prev) =>
              prev.filter(
                (image) =>
                  image.id !== id
              )
          );

          setRemovedImages(
            (prev) => [
              ...prev,
              id,
            ]
          );
        }}
      />

      <ProductOptions
        form={form}
        setForm={setForm}
      />

      <Button
        type="button"
        className="w-full"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading
          ? "Saving..."
          : mode ===
            "create"
          ? "Create Product"
          : "Update Product"}
      </Button>

    </div>
  );
}