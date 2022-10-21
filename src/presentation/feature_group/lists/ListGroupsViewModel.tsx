import {useState, useEffect} from 'react';
import {JoinedGroups} from '../../../domain/model/JoinedGroups';
import {User} from '../../../domain/model/User';
import {AcceptGroupInvitation} from '../../../domain/use_case/AcceptGroupInvitation';
import {GetGroupDetails} from '../../../domain/use_case/GetGroupDetails';
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

  async function getGroupDetails(groupName?: string) {
    let group;
    if (groupName) {
      const {data} = await GetGroupDetails(groupName);
      if (data) {
        group = data;
      }
    }
    return group;
  }

  async function onAcceptInvitation(groupName: string) {
    const result = await AcceptGroupInvitation(user, groupName);
    setGroups(result);
  }

  return {
    groups,
    loading,
    getGroupDetails,
    onAcceptInvitation,
  };
}
