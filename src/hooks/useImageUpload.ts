// File: src/hooks/useImageUpload.ts

import { useState } from "react";

import { uploadImage } from "@/lib/cloudinary";

interface UploadedImage {
  imageUrl: string;

  publicId: string;
}

export function useImageUpload() {
  const [uploading, setUploading] =
    useState(false);

  async function uploadSingle(
    file: File
  ): Promise<UploadedImage> {
    setUploading(true);

    try {
      const upload =
        await uploadImage(file);

      return {
        imageUrl:
          upload.secure_url,

        publicId:
          upload.public_id,
      };
    } finally {
      setUploading(false);
    }
  }

  async function uploadMultiple(
    files: File[]
  ): Promise<UploadedImage[]> {
    setUploading(true);

    try {
      return await Promise.all(
        files.map(async (file) => {
          const upload =
            await uploadImage(file);

          return {
            imageUrl:
              upload.secure_url,

            publicId:
              upload.public_id,
          };
        })
      );
    } finally {
      setUploading(false);
    }
  }

  return {
    uploading,

    uploadSingle,

    uploadMultiple,
  };
}