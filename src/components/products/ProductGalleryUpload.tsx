// File: src/components/products/ProductGalleryUpload.tsx

import {
  ImagePlus,
  Trash2,
} from "lucide-react";

import type {
  ProductImage,
} from "@/types/product";

import { Button } from "@/components/ui/button";

interface ProductGalleryUploadProps {
  images: ProductImage[];

  files: File[];

  setFiles: React.Dispatch<
    React.SetStateAction<File[]>
  >;

  onDelete: (id: string) => void;
}

export default function ProductGalleryUpload({
  images,
  files,
  setFiles,
  onDelete,
}: ProductGalleryUploadProps) {
  function handleFiles(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const selected = e.target.files;

    if (!selected) return;

    const newFiles = Array.from(selected);

    setFiles((prev) => [
      ...prev,
      ...newFiles,
    ]);

    e.target.value = "";
  }

  function removeNewFile(
    index: number
  ) {
    setFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  return (
    <section className="rounded-xl border bg-white p-6">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Gallery Images
        </h2>

        <p className="text-sm text-slate-500">
          Upload multiple product images.
        </p>

      </div>

      <label className="mb-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 px-6 py-12 transition hover:border-black hover:bg-slate-50">

        <ImagePlus
          size={48}
          className="mb-4 text-slate-400"
        />

        <h3 className="font-semibold">
          Upload Gallery Images
        </h3>

        <p className="mt-2 text-center text-sm text-slate-500">
          Click to choose images
        </p>

        <p className="mt-3 text-sm font-medium text-blue-600">
          {files.length} file(s) selected
        </p>

        <input
          hidden
          multiple
          type="file"
          accept="image/*"
          onChange={handleFiles}
        />

      </label>

      {(images.length === 0 &&
        files.length === 0) && (
        <div className="rounded-lg border border-dashed py-12 text-center text-slate-500">
          No gallery images selected.
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {images.map((image) => (
          <div
            key={image.id}
            className="overflow-hidden rounded-xl border bg-white shadow-sm"
          >

            <img
              src={image.image_url}
              alt=""
              className="aspect-square w-full object-cover"
            />

            <div className="border-t p-3">

              <Button
                type="button"
                variant="destructive"
                className="w-full"
                onClick={() =>
                  onDelete(image.id)
                }
              >
                <Trash2
                  size={16}
                  className="mr-2"
                />
                Remove
              </Button>

            </div>

          </div>
        ))}

        {files.map((file, index) => (
          <div
            key={`${file.name}-${index}`}
            className="overflow-hidden rounded-xl border bg-white shadow-sm"
          >

            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="aspect-square w-full object-cover"
            />

            <div className="border-t p-3">

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() =>
                  removeNewFile(index)
                }
              >
                <Trash2
                  size={16}
                  className="mr-2"
                />
                Remove
              </Button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}