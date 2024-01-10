import { emojiList, Emoji, type ReactionsDetails } from "~/types/emoji";
import { xata } from "./xata";

type Reactions = "thumbsup" | "star" | "heart" | "rocket";
type ACC = {
  [K in Reactions]: {
    count: {
      filter: {
        emoji: Emoji;
        post: string;
      };
    };
  };
};

export const getReactionCountsByPost = async (post: string) => {
  const aggregateConfig = emojiList.reduce((acc: ACC, emoji: Emoji) => {
    acc[emoji] = {
      count: {
        filter: { emoji, post },
      },
    };
    return acc;
  }, {} as ACC);

  const { aggs } = await xata.db.reactions.aggregate(aggregateConfig);

  return aggs;
};

export const getReactionsDetailsByPost = async (
  post: string,
  userId?: string,
) => {
  const reactionCounts = await getReactionCountsByPost(post);
  const reactionsByUser = await xata.db.reactions
    .filter({
      "user.id": userId || "",
      post,
    })
    .getMany();

  const reactionsDetails = emojiList.reduce(
    (acc: ReactionsDetails, emoji: Emoji) => {
      acc[emoji] = {
        count: reactionCounts[emoji],
        reacted: reactionsByUser.some((reaction) => reaction.emoji === emoji),
      };
      return acc;
    },
    {
      [Emoji.thumbsup]: { count: 0, reacted: false },
      [Emoji.star]: { count: 0, reacted: false },
      [Emoji.heart]: { count: 0, reacted: false },
      [Emoji.rocket]: { count: 0, reacted: false },
    },
  );

  return reactionsDetails;
};
