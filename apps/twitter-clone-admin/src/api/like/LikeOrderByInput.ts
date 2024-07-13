import { SortOrder } from "../../util/SortOrder";

export type LikeOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  userId?: SortOrder;
  tweetId?: SortOrder;
};
