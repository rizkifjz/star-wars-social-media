import {searchMembers} from '../../data/repository/StarWarsRepository';
import {isValidString} from '../../presentation/utils/Methods';
import {User} from '../model/User';

export async function SearchMembers(email: string): Promise<User[]> {
  if (!isValidString(email)) {
    return [];
  }
  return await searchMembers(email);
}
