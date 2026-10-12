"use server";

import { requireAdmin } from "@/lib/require-admin";
import { slugify } from "@/lib/media";
import { createServiceClient } from "@/lib/supabase";

export async function uploadToMedia(file: File, folder: string) {
  const { supabase } = await requireAdmin();
  const safe = slugify(file.name.replace(/\.[^.]+$/, "")) || "file";
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const path = `${folder}/${Date.now()}-${safe}.${ext}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error } = await supabase.storage.from("media").upload(path, buffer, {
    upsert: true,
    contentType: file.type || "application/octet-stream",
  });

  if (error) {
    const serviceClient = createServiceClient();
    if (serviceClient) {
      await serviceClient.storage.createBucket("media", { public: true }).catch(() => {});
      const { error: serviceError } = await serviceClient.storage
        .from("media")
        .upload(path, buffer, {
          upsert: true,
          contentType: file.type || "application/octet-stream",
        });
      if (serviceError) throw new Error(serviceError.message);
      return path;
    }
    throw new Error(error.message);
  }

  return path;
}
