// File: src/components/products/FeaturedImageUpload.tsx

import { ImagePlus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface FeaturedImageUploadProps {
  preview: string;

  onFileChange: (
    file: File,
    preview: string
  ) => void;

  onRemove: () => void;
}

export default function FeaturedImageUpload({
  preview,
  onFileChange,
  onRemove,
}: FeaturedImageUploadProps) {
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    onFileChange(
      file,
      URL.createObjectURL(file)
    );

    e.target.value = "";
  }

  return (
    <section className="rounded-xl border bg-white p-6">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Featured Image
        </h2>

        <p className="text-sm text-slate-500">
          This image is shown as the primary product image.
        </p>

      </div>

      {preview ? (

        <div className="space-y-4">

          <img
            src={preview}
            alt="Featured"
            className="aspect-square w-full rounded-xl border object-cover"
          />

          <div className="flex flex-col gap-3 sm:flex-row">

            <label className="flex-1 cursor-pointer">

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleChange}
              />

              <div>

                <Button
                  type="button"
                  className="w-full"
                >

                  <ImagePlus
                    size={18}
                    className="mr-2"
                  />

                  Change Image

                </Button>

              </div>

            </label>

            <Button
              type="button"
              variant="destructive"
              className="sm:w-auto"
              onClick={onRemove}
            >

              <Trash2
                size={18}
                className="mr-2"
              />

              Remove

            </Button>

          </div>

        </div>

      ) : (

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 px-6 py-16 transition hover:border-black hover:bg-slate-50">

          <ImagePlus
            size={48}
            className="mb-4 text-slate-400"
          />

          <h3 className="font-semibold">
            Upload Featured Image
          </h3>

          <p className="mt-2 text-center text-sm text-slate-500">
            Click here to choose the featured image.
          </p>

          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleChange}
          />

        </label>

      )}

    </section>
  );
}