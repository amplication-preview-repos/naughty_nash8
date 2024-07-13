import { SortOrder } from "../../util/SortOrder";

export type TweetOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  content?: SortOrder;
  author?: SortOrder;
  tweetContent?: SortOrder;
  tweetCreatedAt?: SortOrder;
  tweetAuthor?: SortOrder;
};
