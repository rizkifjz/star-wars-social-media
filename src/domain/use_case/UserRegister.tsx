import {registerUser} from '../../data/repository/StarWarsRepository';
import {isValidString} from '../../presentation/utils/Methods';
import {Registration} from '../model/Registration';
import {Response} from '../model/Response';
import {UserDetails} from '../model/UserDetails';

export async function UserRegister(
  reg: Registration,
): Promise<Response<UserDetails>> {
  const err = formValidation(reg);
  if (Object.keys(err).length !== 0) {
    return {data: null, error: err};
  }
  let {data, error} = await registerUser(reg);
  return {data, error};
}

function formValidation(reg: Registration): object {
  let err = {};
  if (!isValidString(reg.email)) {
    err = {...err, email: 'Email is required'};
  } else if (!reg.email.includes('@')) {
    err = {...err, email: 'Not an email format'};
  }
  if (!isValidString(reg.password)) {
    err = {...err, password: 'Password is required'};
  }
  if (reg.confirmPassword !== reg.password) {
    err = {...err, confirmPassword: 'Password is not the same'};
  }
  if (!isValidString(reg.name)) {
    err = {...err, name: 'Name is required'};
  }
  if (!isValidString(reg.imageUrl)) {
    err = {...err, imageUrl: 'Photo is required'};
  }
  if (!isValidString(reg.job)) {
    err = {...err, job: 'Job is required'};
  }
  return err;
}
