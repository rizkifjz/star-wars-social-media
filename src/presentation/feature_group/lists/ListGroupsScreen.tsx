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
  Icon,
  AlertDialog,
} from 'native-base';
import React, {useRef, useState} from 'react';
import {ChevronRight} from 'react-native-feather';
import {StackParamList} from '../../utils/ScreenNavigation';
import GroupItem from './component/GroupItem';
import useViewModel from './ListGroupsViewModel';

type Props = NativeStackScreenProps<StackParamList, 'home'>;
const ListGroupsScreen = ({route}: Props) => {
  const {user} = route.params;
  const {groups, getGroupDetails, onAcceptInvitation} = useViewModel(user);
  const [tempJoinedSelected, setTempJoinedSelected] = useState<string | null>(
    null,
  );
  const [tempInviteSelected, setTempInviteSelected] = useState<string | null>(
    null,
  );
  const cancelRef = useRef(null);

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const onNavigate = async (groupName?: string, toDetails?: boolean) => {
    const group = await getGroupDetails(groupName);
    if (toDetails && group) {
      navigation.navigate('groupDetails', {group: group});
    } else {
      navigation.navigate('createGroup', {group: group, user: user});
    }
  };

  const onGroupJoinedSelected = (groupName: string) =>
    setTempJoinedSelected(groupName);
  const onCloseJoined = () => setTempJoinedSelected(null);
  const onConfirmNavigate = (toDetails: boolean) => {
    if (tempJoinedSelected) {
      onNavigate(tempJoinedSelected, toDetails);
    }
    setTempJoinedSelected(null);
  };

  const onGroupInviteSelected = (groupName: string) =>
    setTempInviteSelected(groupName);
  const onCloseInvite = () => setTempInviteSelected(null);
  const onConfirmInvite = () => {
    if (tempInviteSelected) {
      onAcceptInvitation(tempInviteSelected);
    }
    setTempInviteSelected(null);
  };

  return (
    <Box flex={1} bg="secondary.800">
      <Center px="2" pt="2">
        <Heading color="primary.400" size="md">
          My Groups
        </Heading>
      </Center>
      <HStack
        bg="primary.100"
        pl="5"
        mt="2"
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Heading size="xs">Created Group</Heading>
        <Button
          colorScheme="primary"
          variant="subtle"
          size="sm"
          endIcon={<Icon as={ChevronRight} size="sm" />}
          onPress={() => onNavigate()}>
          Create New
        </Button>
      </HStack>
      {groups.createdGroups.length > 0 ? (
        <Box>
          <FlatList
            data={groups.createdGroups}
            renderItem={({item}) => (
              <GroupItem
                groupName={item}
                onPress={() => onGroupJoinedSelected(item)}
              />
            )}
          />
        </Box>
      ) : (
        <Center p="4">
          <Text color="error.600">You haven't created a group yet</Text>
        </Center>
      )}
      <HStack bg="primary.100" px="5" py="2" mt="2">
        <Heading size="xs">Joined Group</Heading>
      </HStack>
      {groups.joinedGroups.length > 0 ? (
        <Box>
          <FlatList
            data={groups.joinedGroups}
            renderItem={({item}) => (
              <GroupItem
                groupName={item}
                onPress={() => onGroupJoinedSelected(item)}
              />
            )}
          />
        </Box>
      ) : (
        <Center p="4">
          <Text color="error.600">You haven't joined a group yet</Text>
        </Center>
      )}
      <HStack bg="primary.100" px="5" py="2" mt="2">
        <Heading size="xs">Group Invitation</Heading>
      </HStack>
      {groups.invitedGroups.length > 0 ? (
        <Box>
          <FlatList
            data={groups.invitedGroups}
            renderItem={({item}) => (
              <GroupItem
                groupName={item}
                onPress={() => onGroupInviteSelected(item)}
              />
            )}
          />
        </Box>
      ) : (
        <Center p="4">
          <Text color="error.600">No new invitation</Text>
        </Center>
      )}
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={tempJoinedSelected !== null}
        onClose={onCloseJoined}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Navigation</AlertDialog.Header>
          <AlertDialog.Body>{'Where do you want to go?'}</AlertDialog.Body>
          <AlertDialog.Footer>
            <HStack w="100%" justifyContent={'space-between'}>
              <Button
                colorScheme="primary"
                onPress={() => onConfirmNavigate(true)}>
                Details
              </Button>
              <Button
                colorScheme="primary"
                onPress={() => onConfirmNavigate(false)}>
                Edit
              </Button>
            </HStack>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={tempInviteSelected !== null}
        onClose={onCloseInvite}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Confirmation</AlertDialog.Header>
          <AlertDialog.Body>
            {`Are you sure you want to join ${tempInviteSelected} group?`}
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onCloseInvite}
                ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme="primary" onPress={onConfirmInvite}>
                Confirm
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  );
};

export default ListGroupsScreen;
