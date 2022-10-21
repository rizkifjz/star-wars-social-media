import {acceptGroupInvitation} from '../../data/repository/StarWarsRepository';
import {JoinedGroups} from '../model/JoinedGroups';
import {User} from '../model/User';

export async function AcceptGroupInvitation(
  user: User,
  groupName: string,
): Promise<JoinedGroups> {
  return await acceptGroupInvitation(user, groupName);
}
