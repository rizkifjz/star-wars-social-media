import {editExistingGroup} from '../../data/repository/StarWarsRepository';
import {isValidString} from '../../presentation/utils/Methods';
import {Group} from '../model/Group';
import {Response} from '../model/Response';

export async function EditExistingGroup(form: Group): Promise<Response<Group>> {
  const err = formValidation(form);
  if (Object.keys(err).length !== 0) {
    return {data: null, error: err};
  }
  let {data, error} = await editExistingGroup(form);
  return {data, error};
}

function formValidation(form: Group): object {
  let err = {};
  if (!isValidString(form.name)) {
    err = {...err, name: 'Name is required'};
  }
  if (!isValidString(form.description)) {
    err = {...err, description: 'Description is required'};
  }
  if (form.joinedUser.length < 1) {
    err = {...err, joinedUser: 'A group must have at least one member'};
  }
  return err;
}
