import type { APIRoute } from "astro";
import { xata } from "~/utils/xata";

export const POST: APIRoute = async ({ request, cookies }) => {
  const user = cookies.get("userId");

  if (!user)
    return new Response(
      JSON.stringify({ message: "Must be logged in to react to posts" }),
      { status: 401 },
    );

  const { post, emoji } = await request.json();

  if (!post || !emoji)
    return new Response(
      JSON.stringify({ message: "post and emoji must be included" }),
      { status: 401 },
    );

  try {
    const existingReaction = await xata.db.reactions
      .filter({
        post,
        emoji,
        "user.id": user.value,
      })
      .getFirst();

    if (existingReaction) {
      await existingReaction.delete();
      return new Response(JSON.stringify(existingReaction), {
        status: 200,
      });
    } else {
      const createdReaction = await xata.db.reactions.create({
        post,
        emoji,
        user: user.value,
      });

      return new Response(JSON.stringify(createdReaction), {
        status: 200,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  return new Response("success", { status: 200 });
};
