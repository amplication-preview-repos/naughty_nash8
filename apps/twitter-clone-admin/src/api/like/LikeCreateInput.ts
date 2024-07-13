import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
import { TweetWhereUniqueInput } from "../tweet/TweetWhereUniqueInput";

export type LikeCreateInput = {
  user?: UserWhereUniqueInput | null;
  tweet?: TweetWhereUniqueInput | null;
};
