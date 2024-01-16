import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email(),
});

export default newsletterSchema;
