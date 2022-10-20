import {User} from './User';

export type Group = {
  name: string;
  description: string;
  imageUrl: string | undefined;
  creator: User;
  joinedUser: User[];
  invitedUser: User[];
};
