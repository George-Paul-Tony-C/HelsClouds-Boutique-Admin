// File: src/features/products/types.ts

export interface Product {
  id: string;

  product_code: string;

  name: string;

  slug: string;

  description: string | null;

  category_id: string;

  cost_price: number;

  selling_price: number;

  material: string | null;

  color: string | null;

  featured_image_url: string | null;

  is_best_seller: boolean;

  is_new_arrival: boolean;

  is_featured: boolean;

  display_order: number;

  is_available: boolean;

  created_at: string;

  updated_at: string;
}

export interface ProductFormData {
  product_code: string;

  name: string;

  slug: string;

  description: string;

  category_id: string;

  cost_price: number;

  selling_price: number;

  material: string;

  color: string;

  featured_image_url: string;

  display_order: number;

  is_best_seller: boolean;

  is_new_arrival: boolean;

  is_featured: boolean;

  is_available: boolean;
}

export interface ProductImage {
  id: string;

  product_id: string;

  image_url: string;

  cloudinary_public_id: string | null;

  alt_text: string | null;

  display_order: number;

  is_primary: boolean;

  created_at: string;
}

export interface ProductsResponse {
  data: Product[];

  total: number;
}

export interface UploadedImage {
  imageUrl: string;

  publicId: string;
}