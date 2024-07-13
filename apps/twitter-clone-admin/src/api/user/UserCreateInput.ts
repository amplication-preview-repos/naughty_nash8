import { InputJsonValue } from "../../types";
import { LikeCreateNestedManyWithoutUsersInput } from "./LikeCreateNestedManyWithoutUsersInput";

export type UserCreateInput = {
  firstName?: string | null;
  lastName?: string | null;
  username: string;
  email?: string | null;
  password: string;
  roles: InputJsonValue;
  bio?: string | null;
  likes?: LikeCreateNestedManyWithoutUsersInput;
  userBio?: string | null;
  userName?: string | null;
  emailAddress?: string | null;
  userPassword?: string | null;
};
