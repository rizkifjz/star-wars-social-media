import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {Group} from '../../../domain/model/Group';
import {User} from '../../../domain/model/User';
import {CreateNewGroup} from '../../../domain/use_case/CreateNewGroup';
import {EditExistingGroup} from '../../../domain/use_case/EditExistingGroup';
import {StackParamList} from '../../utils/ScreenNavigation';

export default function CreateGroupViewModel(user: User, group?: Group) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [formData, setFormData] = useState<Group>({
    name: '',
    description: '',
    imageUrl: undefined,
    creator: user,
    joinedUser: [user],
    invitedUser: [],
  });
  const [errors, setErrors] = useState({
    message: null,
    name: null,
    description: null,
    joinedUser: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (group) {
      setFormData(group);
    }
  }, [group]);

  async function onSave() {
    setLoading(true);
    let {data, error} = await CreateNewGroup(formData);
    if (data === null) {
      setErrors({
        name: error?.name,
        description: error?.description,
        joinedUser: error?.joinedUser,
        message: error?.message,
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'home', params: {user: user}}],
      });
    }
    setLoading(false);
  }

  async function onEdit() {
    setLoading(true);
    let {data, error} = await EditExistingGroup(formData);
    if (data === null) {
      setErrors({
        name: error?.name,
        description: error?.description,
        joinedUser: error?.joinedUser,
        message: error?.message,
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'home', params: {user: user}}],
      });
    }
    setLoading(false);
  }

  function setFormString(type: string, value: string) {
    setFormData({...formData, [type]: value});
  }

  return {
    formData,
    errors,
    loading,
    setFormString,
    setFormData,
    onSave,
    onEdit,
  };
}
