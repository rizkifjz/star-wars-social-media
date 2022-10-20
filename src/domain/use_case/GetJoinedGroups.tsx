import {getJoinedGroups} from '../../data/repository/StarWarsRepository';
import {JoinedGroups} from '../model/JoinedGroups';

export async function GetJoinedGroups(name: string): Promise<JoinedGroups> {
  return await getJoinedGroups(name);
}
