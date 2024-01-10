export enum Emoji {
  thumbsup = "thumbsup",
  star = "star",
  heart = "heart",
  rocket = "rocket",
}

export type ReactionDetail = {
  count: number;
  reacted: boolean;
};

export type ReactionsDetails = {
  [Emoji.thumbsup]: ReactionDetail;
  [Emoji.star]: ReactionDetail;
  [Emoji.heart]: ReactionDetail;
  [Emoji.rocket]: ReactionDetail;
};

export const emojiList = Object.values(Emoji);
