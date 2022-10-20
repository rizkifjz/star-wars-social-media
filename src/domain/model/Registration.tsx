import {Job} from './Job';

export type Registration = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  imageUrl: string;
  job: Job;
};
