import type { APIRoute } from "astro";
import { xata } from "~/utils/xata";
import newsletterSchema from "~/schemas/newsletterSchema";
import { FetcherError } from "@xata.io/client";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const email = formData.get("email");

  if (!email || typeof email !== "string") {
    return redirect(
      "/newsletter/failure?message=please enter a valid email ",
      307
    );
  }

  const validated = newsletterSchema.safeParse(data);

  if (!validated.success) {
    return redirect("/newsletter/failure?message=not a valid email", 307);
  }

  try {
    await xata.db.subscribers.create({
      email: email as string,
    });
  } catch (error) {
    if (
      error instanceof FetcherError &&
      error.errors?.length &&
      error.errors[0]
    )
      return redirect(
        `/newsletter/failure?message=${error.errors[0].message}`,
        307
      );
  }

  return redirect("/newsletter/success", 307);
};
