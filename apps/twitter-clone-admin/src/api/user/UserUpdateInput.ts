import { InputJsonValue } from "../../types";
import { LikeUpdateManyWithoutUsersInput } from "./LikeUpdateManyWithoutUsersInput";

export type UserUpdateInput = {
  firstName?: string | null;
  lastName?: string | null;
  username?: string;
  email?: string | null;
  password?: string;
  roles?: InputJsonValue;
  bio?: string | null;
  likes?: LikeUpdateManyWithoutUsersInput;
  userBio?: string | null;
  userName?: string | null;
  emailAddress?: string | null;
  userPassword?: string | null;
};
