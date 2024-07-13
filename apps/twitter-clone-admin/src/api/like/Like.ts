import { User } from "../user/User";
import { Tweet } from "../tweet/Tweet";

export type Like = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User | null;
  tweet?: Tweet | null;
};
