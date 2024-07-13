import { LikeCreateNestedManyWithoutTweetsInput } from "./LikeCreateNestedManyWithoutTweetsInput";

export type TweetCreateInput = {
  content?: string | null;
  author?: string | null;
  likes?: LikeCreateNestedManyWithoutTweetsInput;
  tweetContent?: string | null;
  tweetCreatedAt?: Date | null;
  tweetAuthor?: string | null;
};
