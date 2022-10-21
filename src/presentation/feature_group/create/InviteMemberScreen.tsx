import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  Box,
  HStack,
  IconButton,
  Icon,
  Heading,
  FormControl,
  Input,
  FlatList,
  AlertDialog,
  Button,
} from 'native-base';
import React, {useRef, useState} from 'react';
import {BackHandler} from 'react-native';
import {ChevronLeft} from 'react-native-feather';
import {User} from '../../../domain/model/User';
import {StackParamList} from '../../utils/ScreenNavigation';
import MemberItem from './component/MemberItem';
import useViewModel from './InviteMemberViewModel';

type Props = NativeStackScreenProps<StackParamList, 'inviteMembers'>;
const InviteMemberScreen = ({route}: Props) => {
  const {existingUser} = route.params;
  const {members, setSearch, addInvitedUser, selectedUsers} = useViewModel();
  const [tempSelected, setTempSelected] = useState<User | null>(null);
  const cancelRef = useRef(null);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  function isMemberInvited(item: User): boolean {
    return (
      selectedUsers.filter(e => e.email === item.email).length > 0 ||
      existingUser.filter(e => e.email === item.email).length > 0
    );
  }

  const onUserSelected = (item: User) => setTempSelected(item);
  const onClose = () => setTempSelected(null);
  const onConfirm = () => {
    if (tempSelected) {
      addInvitedUser(tempSelected);
    }
    setTempSelected(null);
  };

  const onPressBack = () => {
    navigation.navigate({
      name: 'createGroup',
      params: {invitedUser: selectedUsers, user: existingUser[0]},
      merge: true,
    });
  };
  BackHandler.addEventListener('hardwareBackPress', function () {
    if (selectedUsers.length > 0) {
      onPressBack();
      return true;
    }
    return false;
  });

  return (
    <Box flex={1} bg="secondary.800">
      <HStack
        alignItems={'center'}
        px="2"
        pt="2"
        justifyContent={'space-between'}>
        <IconButton
          icon={<Icon size="sm" as={ChevronLeft} color="primary.400" />}
          onPress={onPressBack}
        />
        <Heading color="primary.400" size="md">
          Invite Member
        </Heading>
        <Icon size="lg" color="transparent" />
      </HStack>
      <FormControl px="4">
        <FormControl.Label _text={{color: 'primary.600'}}>
          Email address to invite
        </FormControl.Label>
        <Input
          color="white"
          variant="outline"
          placeholder="Email Address"
          keyboardType="email-address"
          returnKeyType="next"
          autoCapitalize="none"
          onChangeText={value => setSearch(value)}
          blurOnSubmit={false}
        />
      </FormControl>
      <FlatList
        data={members}
        renderItem={({item}) => (
          <MemberItem
            user={item}
            isSelected={isMemberInvited(item)}
            onPress={() => onUserSelected(item)}
          />
        )}
      />
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={tempSelected !== null}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Invite</AlertDialog.Header>
          <AlertDialog.Body>
            {`Confirm inviting ${tempSelected?.name} to you group?`}
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme="primary" onPress={onConfirm}>
                Confirm
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  );
};

export default InviteMemberScreen;
