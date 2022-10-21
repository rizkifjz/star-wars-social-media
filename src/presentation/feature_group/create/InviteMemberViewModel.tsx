import {useState, useEffect} from 'react';
import {User} from '../../../domain/model/User';
import {SearchMembers} from '../../../domain/use_case/SearchMembers';

export default function InviteMemberViewModel() {
  const [members, setMembers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  useEffect(() => {
    searchMembers(search);
  }, [search]);

  async function searchMembers(email: string) {
    let result = await SearchMembers(email);
    setMembers(result);
  }

  function addInvitedUser(value: User) {
    selectedUsers.push(value);
    setSelectedUsers(selectedUsers);
  }

  return {
    members,
    setSearch,
    addInvitedUser,
    selectedUsers,
  };
}
