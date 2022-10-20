import {loginUser} from '../../data/repository/StarWarsRepository';
import {isValidString} from '../../presentation/utils/Methods';
import {Authentication} from '../model/Authentication';
import {Response} from '../model/Response';
import {User} from '../model/User';

export async function UserLogin(auth: Authentication): Promise<Response<User>> {
  const err = formValidation(auth);
  if (Object.keys(err).length !== 0) {
    return {data: null, error: err};
  }
  let {data, error} = await loginUser(auth);
  return {data, error};
}

function formValidation(auth: Authentication): object {
  let err = {};
  if (!isValidString(auth.email)) {
    err = {...err, email: 'Email is required'};
  } else if (!auth.email.includes('@')) {
    err = {...err, email: 'Not an email format'};
  }
  if (!isValidString(auth.password)) {
    err = {...err, password: 'Password is required'};
  }
  return err;
}
