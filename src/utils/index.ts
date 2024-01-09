import type { CollectionEntry } from "astro:content";

export const getCategoriesFromPosts = (posts: CollectionEntry<"posts">[]) => {
  const allCategories = posts.flatMap((p) => p.data.categories);
  return Array.from(new Set(allCategories));
};

export const redirectTo = (path: string) => {
  window.location.replace(path);
};
