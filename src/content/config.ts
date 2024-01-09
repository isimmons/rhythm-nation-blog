import { defineCollection } from "astro:content";
import authorSchema from "~/schemas/authorSchema";
import postSchema from "~/schemas/postsSchema";

const posts = defineCollection({
  type: "content",
  schema: postSchema,
});

const authors = defineCollection({
  type: "content",
  schema: authorSchema,
});

export const collections = {
  posts,
  authors,
};
