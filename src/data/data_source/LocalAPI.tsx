import AsyncStorage from '@react-native-async-storage/async-storage';
import {Authentication} from '../../domain/model/Authentication';
import {Group} from '../../domain/model/Group';
import {JoinedGroups} from '../../domain/model/JoinedGroups';
import {Registration} from '../../domain/model/Registration';
import {Response} from '../../domain/model/Response';
import {User} from '../../domain/model/User';
import {UserDetails} from '../../domain/model/UserDetails';

export const REGISTERED_USERS = 'REGISTERED_USERS';
export const LOGGED_IN_USER = 'LOGGED_IN_USER';
export const JOINED_GROUPS = 'JOINED_GROUPS';

const fakeLoading = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

export async function login(form: Authentication): Promise<Response<User>> {
  try {
    await fakeLoading(2000);
    //Simulated api handling error response when user submit a login form
    let users: User[] = [];
    let usersString = await AsyncStorage.getItem(REGISTERED_USERS);
    if (usersString) {
      users = JSON.parse(usersString);
    }
    let filteredData = users.filter(user => user.email === form.email);
    let foundUser = filteredData.length > 0 ? filteredData[0] : null;
    if (foundUser == null) {
      return Promise.resolve({error: {message: 'User Not Found'}, data: null});
    }
    let details: UserDetails | null = null;
    let detailsString = await AsyncStorage.getItem(`user@${foundUser.email}`);
    if (detailsString) {
      details = JSON.parse(detailsString);
    }
    if (details == null) {
      return Promise.resolve({error: {message: 'System Error?'}, data: null});
    }
    if (details.password !== form.password) {
      return Promise.resolve({error: {message: 'Wrong Password'}, data: null});
    }

    //Simulated login success
    const sFoundUser = JSON.stringify(foundUser);
    AsyncStorage.setItem(LOGGED_IN_USER, sFoundUser);
    return Promise.resolve({error: null, data: foundUser});
  } catch (err) {
    if (err instanceof Error) {
      return Promise.resolve({error: {message: err.message}, data: null});
    }
    return Promise.resolve({error: {message: 'System Error'}, data: null});
  }
}

export async function register(
  reg: Registration,
): Promise<Response<UserDetails>> {
  try {
    await fakeLoading(2000);
    //Simulated api handling error response when user register a new user
    let existingUser = await AsyncStorage.getItem(`user@${reg.email}`);
    if (existingUser) {
      return Promise.resolve({
        error: {message: 'Email has already been used'},
        data: null,
      });
    }
    //Simulated register success
    const newUser: UserDetails = {
      name: reg.name,
      email: reg.email,
      password: reg.password,
      job: reg.job,
      imageUrl: reg.imageUrl,
      height: null,
      mass: null,
      birth_year: null,
      gender: null,
      hair_color: null,
      skin_color: null,
      eye_color: null,
      starships: [],
    };
    const forArray: User = {
      name: reg.name,
      email: reg.email,
      job: reg.job,
      imageUrl: reg.imageUrl,
    };
    const sNewUser = JSON.stringify(newUser);
    AsyncStorage.setItem(`user@${reg.email}`, sNewUser);
    let users: User[] = [];
    let usersString = await AsyncStorage.getItem(REGISTERED_USERS);
    if (usersString) {
      users = JSON.parse(usersString);
    }
    users.push(forArray);
    const registeredUsers = JSON.stringify(users);
    AsyncStorage.setItem(REGISTERED_USERS, registeredUsers);
    return Promise.resolve({error: null, data: newUser});
  } catch (err) {
    if (err instanceof Error) {
      return Promise.resolve({error: {message: err.message}, data: null});
    }
    return Promise.resolve({error: {message: 'System Error'}, data: null});
  }
}

export async function joinedGroups(email: string) {
  let joined: JoinedGroups = {
    createdGroups: [],
    joinedGroups: [],
    invitedGroups: [],
  };
  let sJoined = await AsyncStorage.getItem(`${JOINED_GROUPS}@${email}`);
  if (sJoined !== null) {
    joined = JSON.parse(sJoined);
  }
  return Promise.resolve(joined);
}

export async function createGroup(form: Group) {
  try {
    await fakeLoading(2000);
    let existingGroup = await AsyncStorage.getItem(`group@${form.name}`);
    if (existingGroup) {
      return Promise.resolve({
        error: {message: 'This group name has already been taken'},
        data: null,
      });
    }
    //Simulated register success
    let joined: JoinedGroups = {
      createdGroups: [],
      joinedGroups: [],
      invitedGroups: [],
    };
    let sJoined = await AsyncStorage.getItem(
      `${JOINED_GROUPS}@${form.creator.email}`,
    );
    if (sJoined !== null) {
      joined = JSON.parse(sJoined);
    }
    joined.createdGroups.push(form.name);
    const s2Joined = JSON.stringify(joined);
    AsyncStorage.setItem(`${JOINED_GROUPS}@${form.creator.email}`, s2Joined);

    inviteUsers(form.name, form.invitedUser);

    const sForm = JSON.stringify(form);
    AsyncStorage.setItem(`group@${form.name}`, sForm);
    return Promise.resolve({error: null, data: form});
  } catch (err) {
    if (err instanceof Error) {
      return Promise.resolve({error: {message: err.message}, data: null});
    }
    return Promise.resolve({error: {message: 'System Error'}, data: null});
  }
}

export async function editGroup(form: Group) {
  try {
    await fakeLoading(2000);
    inviteUsers(form.name, form.invitedUser);
    const sForm = JSON.stringify(form);
    AsyncStorage.setItem(`group@${form.name}`, sForm);
    return Promise.resolve({error: null, data: form});
  } catch (err) {
    if (err instanceof Error) {
      return Promise.resolve({error: {message: err.message}, data: null});
    }
    return Promise.resolve({error: {message: 'System Error'}, data: null});
  }
}

export async function getGroup(name: string) {
  try {
    let sGroup = await AsyncStorage.getItem(`group@${name}`);
    if (sGroup === null) {
      return Promise.resolve({
        error: {message: 'Group not found'},
        data: null,
      });
    }
    let group = JSON.parse(sGroup);
    return Promise.resolve({error: null, data: group});
  } catch (err) {
    if (err instanceof Error) {
      return Promise.resolve({error: {message: err.message}, data: null});
    }
    return Promise.resolve({error: {message: 'System Error'}, data: null});
  }
}

export async function searchUsers(email: string) {
  try {
    let users: User[] = [];
    let sUsers = await AsyncStorage.getItem(REGISTERED_USERS);
    if (sUsers !== null) {
      let parsed: User[] = JSON.parse(sUsers);
      users = parsed.filter(user => user.email.includes(email));
    }
    return Promise.resolve(users);
  } catch (err) {
    if (err instanceof Error) {
      return Promise.resolve([]);
    }
    return Promise.resolve([]);
  }
}

export async function inviteUsers(groupName: string, users: User[]) {
  users.forEach(async user => {
    const joined = await joinedGroups(user.email);
    joined.invitedGroups.push(groupName);
    const sJoined = JSON.stringify(joined);
    AsyncStorage.setItem(`${JOINED_GROUPS}@${user.email}`, sJoined);
  });
}

export async function acceptInvitation(user: User, groupName: string) {
  //Set user when accept
  let joined = await joinedGroups(user.email);
  let newJoined: JoinedGroups = {
    createdGroups: joined.createdGroups,
    joinedGroups: joined.joinedGroups.concat([groupName]),
    invitedGroups: joined.invitedGroups.filter(item => item !== groupName),
  };
  const sNewJoined = JSON.stringify(newJoined);
  AsyncStorage.setItem(`${JOINED_GROUPS}@${user.email}`, sNewJoined);

  //Set group when accept
  let sGroup = await AsyncStorage.getItem(`group@${groupName}`);
  if (sGroup) {
    const group: Group = JSON.parse(sGroup);
    const newInvitedUser = group.invitedUser.filter(
      u => u.email !== user.email,
    );
    const newJoinedUser = group.joinedUser.concat([user]);
    const newGroup = {
      ...group,
      invitedUser: newInvitedUser,
      joinedUser: newJoinedUser,
    };
    const sForm = JSON.stringify(newGroup);
    AsyncStorage.setItem(`group@${group.name}`, sForm);
  }
  return Promise.resolve(newJoined);
}
