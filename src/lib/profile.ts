// src/lib/profile.ts
import { supabase } from "./supabase";

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle(); // Use maybeSingle() instead of single() to avoid throwing on empty rows

  if (error) {
    console.error("Error fetching profile:", error.message);
    throw error;
  }

  return data;
}