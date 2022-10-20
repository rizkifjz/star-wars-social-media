import {useState, useEffect} from 'react';
import {JoinedGroups} from '../../../domain/model/JoinedGroups';
import {User} from '../../../domain/model/User';
import {GetJoinedGroups} from '../../../domain/use_case/GetJoinedGroups';

export default function ListGroupsViewModel(user: User) {
  const [groups, setGroups] = useState<JoinedGroups>({
    createdGroups: [],
    joinedGroups: [],
    invitedGroups: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onGetJoinedGroups(user);
  }, [user]);

  async function onGetJoinedGroups(u: User) {
    setLoading(true);
    let result = await GetJoinedGroups(u.email);
    setGroups(result);
    setLoading(false);
  }

  return {
    groups,
    loading,
  };
}
