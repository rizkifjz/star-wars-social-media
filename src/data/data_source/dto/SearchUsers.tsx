import {UserDetails} from '../../../domain/model/UserDetails';

export type SearchUsers = {
  count: number;
  results: UserDetails[];
};
