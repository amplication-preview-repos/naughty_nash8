import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { LikeListRelationFilter } from "../like/LikeListRelationFilter";

export type UserWhereInput = {
  id?: StringFilter;
  firstName?: StringNullableFilter;
  lastName?: StringNullableFilter;
  username?: StringFilter;
  email?: StringNullableFilter;
  bio?: StringNullableFilter;
  likes?: LikeListRelationFilter;
  userBio?: StringNullableFilter;
  userName?: StringNullableFilter;
  emailAddress?: StringNullableFilter;
  userPassword?: StringNullableFilter;
};
