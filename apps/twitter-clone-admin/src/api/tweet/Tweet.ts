import { Like } from "../like/Like";

export type Tweet = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string | null;
  author: string | null;
  likes?: Array<Like>;
  tweetContent: string | null;
  tweetCreatedAt: Date | null;
  tweetAuthor: string | null;
};
