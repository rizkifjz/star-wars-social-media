import {getUserDetails} from '../../data/repository/StarWarsRepository';
import {Response} from '../model/Response';
import {UserDetails} from '../model/UserDetails';

export async function GetUserDetails(
  name: string,
): Promise<Response<UserDetails | null>> {
  return await getUserDetails(name);
}
