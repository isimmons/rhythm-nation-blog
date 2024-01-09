import { z, type SchemaContext } from "astro:content";

const authorSchema = ({ image }: SchemaContext) =>
  z.object({
    name: z
      .string()
      .min(2, { message: "A name must be at least 2 characters" }),
    image: image().refine((img) => img.width >= 1024, {
      message: "Cover image must be at least 1024 pixels",
    }),
  });

export default authorSchema;
