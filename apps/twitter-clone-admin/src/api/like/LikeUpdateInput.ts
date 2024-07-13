import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
import { TweetWhereUniqueInput } from "../tweet/TweetWhereUniqueInput";

export type LikeUpdateInput = {
  user?: UserWhereUniqueInput | null;
  tweet?: TweetWhereUniqueInput | null;
};
