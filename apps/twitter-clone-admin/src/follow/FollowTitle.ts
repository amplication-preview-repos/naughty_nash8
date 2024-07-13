import { Follow as TFollow } from "../api/follow/Follow";

export const FOLLOW_TITLE_FIELD = "follower";

export const FollowTitle = (record: TFollow): string => {
  return record.follower?.toString() || String(record.id);
};
