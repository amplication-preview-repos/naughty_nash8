import { LikeUpdateManyWithoutTweetsInput } from "./LikeUpdateManyWithoutTweetsInput";

export type TweetUpdateInput = {
  content?: string | null;
  author?: string | null;
  likes?: LikeUpdateManyWithoutTweetsInput;
  tweetContent?: string | null;
  tweetCreatedAt?: Date | null;
  tweetAuthor?: string | null;
};
