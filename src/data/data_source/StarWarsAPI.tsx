import {create} from 'apisauce';
import {StarshipDetails} from '../../domain/model/StarshipDetails';
import {SearchUsers} from './dto/SearchUsers';

const NetworkManager = create({
  baseURL: 'https://swapi.dev/api/',
  timeout: 1000 * 3,
});

export async function userDetails(name: string) {
  return await NetworkManager.get<SearchUsers>(`people/?search=${name}`);
}

export async function starshipDetails(url: string) {
  const costumUrl = create({
    baseURL: url,
    timeout: 1000 * 3,
  });
  return await costumUrl.get<StarshipDetails>('');
}
