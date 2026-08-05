// File: src/components/categories/CategoryImageUpload.tsx

import {
  ImagePlus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface CategoryImageUploadProps {
  preview: string;

  onFileChange: (
    file: File,
    preview: string
  ) => void;
}

export default function CategoryImageUpload({
  preview,
  onFileChange,
}: CategoryImageUploadProps) {
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    onFileChange(
      file,
      URL.createObjectURL(file)
    );
  }

  return (
    <section className="rounded-xl border bg-white p-6">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Category Image
        </h2>

        <p className="text-sm text-slate-500">
          Upload the image shown for this
          category.
        </p>

      </div>

      {preview ? (

        <div className="space-y-4">

          <img
            src={preview}
            alt="Preview"
            className="h-72 w-full rounded-xl border object-cover"
          />

          <div className="flex flex-col gap-3 sm:flex-row">

            <label className="flex-1 cursor-pointer">

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleChange}
              />

              <div className="flex h-10 items-center justify-center rounded-md bg-black text-white transition hover:bg-slate-800">

                <ImagePlus
                  size={18}
                  className="mr-2"
                />

                Change Image

              </div>

            </label>

            <Button
              type="button"
              variant="destructive"
              onClick={() =>
                onFileChange(
                  new File([], ""),
                  ""
                )
              }
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

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 py-16 transition hover:border-slate-500 hover:bg-slate-50">

          <ImagePlus
            size={48}
            className="mb-4 text-slate-400"
          />

          <h3 className="font-semibold">
            Upload Category Image
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Click to select an image
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