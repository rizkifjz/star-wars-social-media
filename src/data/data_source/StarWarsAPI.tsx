import {create} from 'apisauce';
import {SearchUsers} from './dto/SearchUsers';

const NetworkManager = create({
  baseURL: 'https://swapi.dev/api/',
  timeout: 1000 * 3,
});

export async function userDetails(name: string) {
  return await NetworkManager.get<SearchUsers>(`people/?search=${name}`);
}
