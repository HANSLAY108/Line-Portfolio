import { cacheLife, cacheTag } from "next/cache";
import { createAnonClient } from "./supabase";
import type { PostRow } from "./types";

async function loadPosts(): Promise<PostRow[]> {
  const supabase = createAnonClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  return (data as PostRow[]) ?? [];
}

export async function getPublishedPosts(): Promise<PostRow[]> {
  "use cache";
  cacheTag("blog-posts");
  cacheLife("minutes");
  return loadPosts();
}
