import {Authentication} from '../../domain/model/Authentication';
import {Registration} from '../../domain/model/Registration';
import {Response} from '../../domain/model/Response';
import {User} from '../../domain/model/User';
import {UserDetails} from '../../domain/model/UserDetails';
import {
  createGroup,
  getGroup,
  joinedGroups,
  login,
  register,
} from '../data_source/LocalAPI';
import {userDetails} from '../data_source/StarWarsAPI';
import {AxiosError} from 'axios';
import {JoinedGroups} from '../../domain/model/JoinedGroups';
import {Group} from '../../domain/model/Group';

export async function loginUser(auth: Authentication): Promise<Response<User>> {
  return await login(auth);
}

export async function registerUser(
  reg: Registration,
): Promise<Response<UserDetails>> {
  return await register(reg);
}

export async function getUserDetails(
  name: string,
): Promise<Response<UserDetails | null>> {
  try {
    let {data} = await userDetails(name);
    let user = null;
    if (data && data.count > 0) {
      user = data.results[0];
    }
    return {data: user, error: null};
  } catch (err) {
    const error = err as Error | AxiosError;
    return {data: null, error: error.message};
  }
}

export async function getJoinedGroups(email: string): Promise<JoinedGroups> {
  return await joinedGroups(email);
}

export async function createNewGroup(form: Group): Promise<Response<Group>> {
  return await createGroup(form);
}

export async function getGroupDetails(name: string): Promise<Response<Group>> {
  return await getGroup(name);
}
