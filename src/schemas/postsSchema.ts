import { z, type SchemaContext } from "astro:content";
import { format } from "date-fns";

export type PostCategories =
  | "latest"
  | "insights"
  | "studio tips"
  | "career advice";

const postSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z
      .string()
      .min(3, { message: "A post title but be at least 3 characters." }),
    description: z.string().optional(),
    author: z
      .string()
      .min(3, { message: "An authors name must be at least 3 characters." })
      .max(50, {
        message: "An authors name should be no more than 50 characters.",
      }),
    categories: z.array(z.custom<PostCategories>()),
    date: z.string().transform((str) => format(new Date(str), "MMMM d, yyyy")),
    featured: z.boolean().default(false),
    cover: image().refine((img) => img.width >= 1024, {
      message: "Cover image must be at least 1024 pixels",
    }),
  });

export default postSchema;
