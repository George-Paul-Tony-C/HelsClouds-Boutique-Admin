// File: src/lib/error.ts

type SupabaseError = {
  code?: string;
  message?: string;
  details?: string;
  hint?: string;
};

export function getErrorMessage(
  error: unknown
): string {
  // Network / Fetch Errors

  if (error instanceof TypeError) {
    if (
      error.message
        .toLowerCase()
        .includes("fetch")
    ) {
      return "Unable to connect to the server. Please check your internet connection.";
    }

    return error.message;
  }

  if (
    typeof error !== "object" ||
    error === null
  ) {
    return "Something went wrong.";
  }

  const err = error as SupabaseError;

  const message =
    err.message?.toLowerCase() ?? "";

  const details =
    err.details?.toLowerCase() ?? "";

  /*
   * ===============================
   * Authentication Errors
   * ===============================
   */

  if (
    message.includes(
      "invalid login credentials"
    )
  ) {
    return "Invalid email or password.";
  }

  if (
    message.includes("email not confirmed")
  ) {
    return "Please verify your email before logging in.";
  }

  if (
    message.includes("user already registered")
  ) {
    return "An account with this email already exists.";
  }

  if (
    message.includes("jwt")
  ) {
    return "Your session has expired. Please login again.";
  }

  /*
   * ===============================
   * PostgreSQL Errors
   * ===============================
   */

  switch (err.code) {
    /*
     * Duplicate
     */

    case "23505":

      if (
        message.includes("product_code") ||
        details.includes("product_code")
      ) {
        return "Product code already exists.";
      }

      if (
        message.includes("products_slug_key") ||
        details.includes("slug")
      ) {
        return "Product slug already exists.";
      }

      if (
        message.includes("categories_name_key")
      ) {
        return "Category name already exists.";
      }

      if (
        message.includes("categories_slug_key")
      ) {
        return "Category slug already exists.";
      }

      if (
        message.includes("email")
      ) {
        return "Email already exists.";
      }

      return "This record already exists.";

    /*
     * Foreign Key
     */

    case "23503":
      return "This record is being used elsewhere and cannot be deleted.";

    /*
     * Required Field
     */

    case "23502":
      return "Please fill in all required fields.";

    /*
     * Invalid Value
     */

    case "22P02":
      return "One or more values are invalid.";

    /*
     * Permission
     */

    case "42501":
      return "You don't have permission to perform this action.";

    /*
     * Row Not Found
     */

    case "PGRST116":
      return "Record not found.";
  }

  /*
   * ===============================
   * Storage Errors
   * ===============================
   */

  if (
    message.includes("storage")
  ) {
    return "Unable to upload image.";
  }

  if (
    message.includes("cloudinary")
  ) {
    return "Image upload failed.";
  }

  /*
   * ===============================
   * Timeout
   * ===============================
   */

  if (
    message.includes("timeout")
  ) {
    return "Request timed out. Please try again.";
  }

  /*
   * ===============================
   * Generic
   * ===============================
   */

  return (
    err.message ??
    "Something went wrong."
  );
}