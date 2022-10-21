import {getStarshipDetails} from '../../data/repository/StarWarsRepository';
import {Response} from '../model/Response';
import {StarshipDetails} from '../model/StarshipDetails';

export async function GetStarshipDetails(
  url: string,
): Promise<Response<StarshipDetails | null>> {
  return await getStarshipDetails(url);
}
