import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadPropertyImage(
  file: File,
  propertyId: string,
  filename: string
): Promise<{ url: string; path: string }> {
  const path = `${propertyId}/${filename}`;

  const { error: uploadError } = await supabase.storage
    .from("property-images")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from("property-images")
    .getPublicUrl(path);

  return {
    url: data.publicUrl,
    path: path,
  };
}

export async function deletePropertyImage(path: string): Promise<void> {
  const { error } = await supabase.storage
    .from("property-images")
    .remove([path]);

  if (error) throw error;
}

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
export const ALLOWED_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

export function validateImage(file: File): { valid: boolean; error?: string } {
  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  if (!ALLOWED_IMAGE_EXTENSIONS.includes(ext)) {
    return { valid: false, error: "Formato no permitido. Use: jpg, png, webp" };
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return { valid: false, error: "La imagen debe ser menor a 5MB" };
  }
  return { valid: true };
}