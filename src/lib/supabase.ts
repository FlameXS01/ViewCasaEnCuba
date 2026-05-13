import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (!_supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Supabase credentials not configured");
    }
    
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _supabase;
}

export const supabase = {
  get storage() {
    return getSupabaseClient().storage;
  },
};

export async function uploadPropertyImage(
  file: File,
  propertyId: string,
  filename: string
): Promise<{ url: string; path: string }> {
  const client = getSupabaseClient();
  const path = `${propertyId}/${filename}`;

  const { error: uploadError } = await client.storage
    .from("property-images")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) throw uploadError;

  const { data } = client.storage
    .from("property-images")
    .getPublicUrl(path);

  return {
    url: data.publicUrl,
    path: path,
  };
}

export async function deletePropertyImage(path: string): Promise<void> {
  const client = getSupabaseClient();
  const { error } = await client.storage
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