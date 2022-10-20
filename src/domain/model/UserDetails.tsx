import {Job} from './Job';

export type UserDetails = {
  name: string;
  email: string;
  imageUrl: string;
  job: Job;
  password: string;
  birth_year: number | null;
  gender: string | null;
  height: number | null;
  mass: number | null;
  hair_color: string | null;
  skin_color: string | null;
  eye_color: string | null;
};
