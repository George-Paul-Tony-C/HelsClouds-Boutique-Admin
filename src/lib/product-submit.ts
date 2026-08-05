// File: src/lib/product-submit.ts

import {
  createProduct,
  updateProduct,
} from "@/lib/products";

import {
  addProductImage,
  deleteProductImage,
} from "@/lib/product-images";

import type {
  Product,
  ProductFormData,
} from "@/types/product";

interface UploadedImage {
  imageUrl: string;

  publicId: string;
}

interface SubmitProductParams {
  mode: "create" | "edit";

  product?: Product;

  form: ProductFormData;

  featuredImage?: UploadedImage;

  galleryImages?: UploadedImage[];

  removedImages?: string[];
}

export async function submitProduct({
  mode,
  product,
  form,
  featuredImage,
  galleryImages = [],
  removedImages = [],
}: SubmitProductParams): Promise<Product> {
  const payload: ProductFormData = {
    ...form,

    featured_image_url:
      featuredImage?.imageUrl ??
      form.featured_image_url,
  };

  /*
   * Create / Update Product
   */

  let savedProduct: Product;

  if (mode === "create") {
    savedProduct =
      await createProduct(payload);
  } else {
    if (!product) {
      throw new Error(
        "Product is required for edit mode."
      );
    }

    savedProduct =
      await updateProduct(
        product.id,
        payload
      );
  }

  /*
   * Save Gallery Images
   */

  if (galleryImages.length > 0) {
    await Promise.all(
      galleryImages.map(
        (image, index) =>
          addProductImage(
            savedProduct.id,

            image.imageUrl,

            image.publicId,

            index + 1
          )
      )
    );
  }

  /*
   * Delete Removed Images
   */

  if (removedImages.length > 0) {
    await Promise.all(
      removedImages.map((id) =>
        deleteProductImage(id)
      )
    );
  }

  return savedProduct;
}