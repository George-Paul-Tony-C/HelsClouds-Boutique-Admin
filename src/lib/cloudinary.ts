// File: src/lib/cloudinary.ts

export interface CloudinaryUploadResponse {
  asset_id: string;

  public_id: string;

  version: number;

  version_id: string;

  signature: string;

  width: number;

  height: number;

  format: string;

  resource_type: string;

  created_at: string;

  tags: string[];

  bytes: number;

  type: string;

  etag: string;

  placeholder: boolean;

  url: string;

  secure_url: string;

  original_filename: string;
}

export async function uploadImage(
  file: File
): Promise<CloudinaryUploadResponse> {
  const formData = new FormData();

  formData.append("file", file);

  formData.append(
    "upload_preset",
    import.meta.env
      .VITE_CLOUDINARY_UPLOAD_PRESET
  );

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env
        .VITE_CLOUDINARY_CLOUD_NAME
    }/image/upload`,
    {
      method: "POST",

      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error(
      "Cloudinary Upload Error",
      data
    );

    throw new Error(
      data?.error?.message ??
        "Image upload failed."
    );
  }

  return data;
}