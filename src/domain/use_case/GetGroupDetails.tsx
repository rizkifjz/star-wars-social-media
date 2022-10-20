import {getGroupDetails} from '../../data/repository/StarWarsRepository';
import {Group} from '../model/Group';
import {Response} from '../model/Response';

export async function GetGroupDetails(name: string): Promise<Response<Group>> {
  return await getGroupDetails(name);
}
