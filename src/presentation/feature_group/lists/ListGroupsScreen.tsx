import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  Box,
  Heading,
  Center,
  HStack,
  Text,
  Button,
  FlatList,
} from 'native-base';
import React from 'react';
import {Group} from '../../../domain/model/Group';
import {StackParamList} from '../../utils/ScreenNavigation';
import GroupItem from './component/GroupItem';
import useViewModel from './ListGroupsViewModel';

type Props = NativeStackScreenProps<StackParamList, 'home'>;
const ListGroupsScreen = ({route}: Props) => {
  const {user} = route.params;
  const {groups} = useViewModel(user);

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const onNavigate = (group: Group | null) =>
    navigation.navigate('createGroup', {group: group, user: user});

  return (
    <Box flex={1} bg="secondary.800">
      <Center px="2" pt="2">
        <Heading color="primary.400" size="md">
          Groups
        </Heading>
      </Center>
      <HStack bg="primary.100" px="5" py="2" mt="2">
        <Heading size="xs">Created Group</Heading>
      </HStack>
      {groups.createdGroups.length > 0 ? (
        <Box>
          <FlatList
            data={groups.createdGroups}
            renderItem={({item}) => <GroupItem groupName={item} />}
          />
        </Box>
      ) : (
        <Center p="4">
          <Text color="error.600">You haven't created a group yet</Text>
        </Center>
      )}
      <Center>
        <Button colorScheme="primary" onPress={() => onNavigate(null)}>
          Create Group
        </Button>
      </Center>
      <HStack bg="primary.100" px="5" py="2" mt="4">
        <Heading size="xs">Joined Group</Heading>
      </HStack>
      {groups.joinedGroups.length > 0 ? (
        <FlatList
          data={groups.joinedGroups}
          renderItem={({item}) => <GroupItem groupName={item} />}
        />
      ) : (
        <Center p="4">
          <Text color="error.600">You haven't joined a group yet</Text>
        </Center>
      )}
    </Box>
  );
};

export default ListGroupsScreen;
