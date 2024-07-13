import { StringFilter } from "../../util/StringFilter";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
import { TweetWhereUniqueInput } from "../tweet/TweetWhereUniqueInput";

export type LikeWhereInput = {
  id?: StringFilter;
  user?: UserWhereUniqueInput;
  tweet?: TweetWhereUniqueInput;
};
