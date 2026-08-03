import { useEffect, useState } from "react";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { uploadImage } from "@/lib/cloudinary";

import {
  addProductImage,
  deleteProductImage,
  getProductImages,
} from "@/lib/product-images";

import type { ProductImage } from "@/types/product";

interface ProductImagesProps {
  productId: string;
}

export default function ProductImages({
  productId,
}: ProductImagesProps) {
  const [images, setImages] = useState<ProductImage[]>([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    loadImages();
  }, [productId]);

  async function loadImages() {
    try {
      const data =
        await getProductImages(productId);

      setImages(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = e.target.files;

    if (!files) return;

    try {
      setLoading(true);

      for (const file of Array.from(files)) {
        const upload =
          await uploadImage(file);

        await addProductImage(
          productId,
          upload.secure_url,
          upload.public_id,
          images.length + 1
        );
      }

      loadImages();
    } catch (error) {
      console.error(error);

      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  }

  async function removeImage(
    id: string
  ) {
    if (
      !window.confirm(
        "Delete image?"
      )
    )
      return;

    try {
      await deleteProductImage(id);

      loadImages();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="rounded-xl border bg-white p-6">

      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-xl font-semibold">
          Gallery Images
        </h2>

        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={handleUpload}
          disabled={loading}
        />

      </div>

      <div className="grid grid-cols-2 gap-4">

        {images.map((image) => (
          <div
            key={image.id}
            className="rounded-lg border p-2"
          >

            <img
              src={image.image_url}
              className="h-40 w-full rounded object-cover"
            />

            <Button
              variant="destructive"
              className="mt-2 w-full"
              onClick={() =>
                removeImage(image.id)
              }
            >
              <Trash2
                size={16}
                className="mr-2"
              />

              Delete

            </Button>

          </div>
        ))}

      </div>

    </div>
  );
}