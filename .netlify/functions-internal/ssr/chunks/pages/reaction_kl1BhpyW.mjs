;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="df53bcf8-62ff-49d1-bff8-cdfa94875951",e._sentryDebugIdIdentifier="sentry-dbid-df53bcf8-62ff-49d1-bff8-cdfa94875951")}catch(e){}}();import { x as xata } from './_slug__2dC7f6M1.mjs';
import './404_Lc-3aH9C.mjs';

const POST = async ({ request, cookies }) => {
  const user = cookies.get("userId");
  if (!user)
    return new Response(
      JSON.stringify({ message: "Must be logged in to react to posts" }),
      { status: 401 }
    );
  const { post, emoji } = await request.json();
  if (!post || !emoji)
    return new Response(
      JSON.stringify({ message: "post and emoji must be included" }),
      { status: 401 }
    );
  try {
    const existingReaction = await xata.db.reactions.filter({
      post,
      emoji,
      "user.id": user.value
    }).getFirst();
    if (existingReaction) {
      await existingReaction.delete();
      return new Response(JSON.stringify(existingReaction), {
        status: 200
      });
    } else {
      const createdReaction = await xata.db.reactions.create({
        post,
        emoji,
        user: user.value
      });
      return new Response(JSON.stringify(createdReaction), {
        status: 200
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
  return new Response("success", { status: 200 });
};

export { POST };
//# sourceMappingURL=reaction_kl1BhpyW.mjs.map
