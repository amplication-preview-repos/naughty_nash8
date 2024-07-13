import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type FollowWhereInput = {
  id?: StringFilter;
  follower?: StringNullableFilter;
  followed?: StringNullableFilter;
};
