import {Authentication} from '../../domain/model/Authentication';
import {Registration} from '../../domain/model/Registration';
import {Response} from '../../domain/model/Response';
import {User} from '../../domain/model/User';
import {UserDetails} from '../../domain/model/UserDetails';
import {
  acceptInvitation,
  createGroup,
  editGroup,
  getGroup,
  joinedGroups,
  login,
  register,
  searchUsers,
} from '../data_source/LocalAPI';
import {starshipDetails, userDetails} from '../data_source/StarWarsAPI';
import {AxiosError} from 'axios';
import {JoinedGroups} from '../../domain/model/JoinedGroups';
import {Group} from '../../domain/model/Group';
import {StarshipDetails} from '../../domain/model/StarshipDetails';

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

export async function editExistingGroup(form: Group): Promise<Response<Group>> {
  return await editGroup(form);
}

export async function getGroupDetails(name: string): Promise<Response<Group>> {
  return await getGroup(name);
}

export async function searchMembers(email: string): Promise<User[]> {
  return await searchUsers(email);
}

export async function acceptGroupInvitation(
  user: User,
  groupName: string,
): Promise<JoinedGroups> {
  return await acceptInvitation(user, groupName);
}

export async function getStarshipDetails(
  url: string,
): Promise<Response<StarshipDetails | null>> {
  try {
    let {data} = await starshipDetails(url);
    if (data) {
      return {data: data, error: null};
    }
    return {data: null, error: 'Data not found'};
  } catch (err) {
    const error = err as Error | AxiosError;
    return {data: null, error: error.message};
  }
}
