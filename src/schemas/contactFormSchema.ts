import { z } from "zod";

const contactFormSchema = z.object({
  comment: z
    .string()
    .min(3, { message: "Is 3 characters really all you had to say?" })
    .max(255, { message: "Please use 255 characters or less" }),
});

export default contactFormSchema;
