// File: src/types/product.ts

export interface Product {
  id: string;

  product_code: string;

  name: string;

  slug: string;

  description: string | null;

  cost_price: number;

  selling_price: number;

  category_id: string;

  material: string | null;

  color: string | null;

  featured_image_url?: string;

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

  cost_price: number;

  selling_price: number;

  category_id: string;

  material: string;

  color: string;

  featured_image_url: string;

  is_best_seller: boolean;

  is_new_arrival: boolean;

  is_featured: boolean;

  display_order: number;

  is_available: boolean;
}

export interface ProductImage {
  id: string;

  product_id: string;

  cloudinary_public_id: string;

  image_url: string;

  alt_text: string | null;

  display_order: number;

  is_primary: boolean;

  created_at: string;
}