import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { LikeListRelationFilter } from "../like/LikeListRelationFilter";
import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";

export type TweetWhereInput = {
  id?: StringFilter;
  content?: StringNullableFilter;
  author?: StringNullableFilter;
  likes?: LikeListRelationFilter;
  tweetContent?: StringNullableFilter;
  tweetCreatedAt?: DateTimeNullableFilter;
  tweetAuthor?: StringNullableFilter;
};
