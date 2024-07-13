export type Follow = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  follower: string | null;
  followed: string | null;
};
