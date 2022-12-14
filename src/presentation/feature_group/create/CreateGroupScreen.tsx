import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  Heading,
  Center,
  Avatar,
  HStack,
  IconButton,
  Icon,
  Button,
  FormControl,
  Input,
  WarningOutlineIcon,
  TextArea,
  VStack,
  Text,
  Pressable,
  ScrollView,
} from 'native-base';
import React, {useEffect, useRef} from 'react';
import {ChevronLeft, ChevronRight} from 'react-native-feather';
import {StackParamList} from '../../utils/ScreenNavigation';
import MemberItem from './component/MemberItem';
import useViewModel from './CreateGroupViewModel';

type Props = NativeStackScreenProps<StackParamList, 'createGroup'>;
const CreateGroupScreen = ({route}: Props) => {
  const {group, user, invitedUser} = route.params;
  const {
    formData,
    loading,
    errors,
    setFormString,
    onSave,
    onEdit,
    setFormData,
  } = useViewModel(user, group);

  useEffect(() => {
    if (invitedUser) {
      setFormData(state => ({
        ...state,
        invitedUser: state.invitedUser.concat(invitedUser),
      }));
    }
  }, [invitedUser, setFormData]);

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const onPressBack = () => navigation.goBack();
  const onInviteMember = () =>
    navigation.navigate('inviteMembers', {
      existingUser: formData.joinedUser.concat(formData.invitedUser),
    });
  const secondTextInput = useRef<any>(null);
  return (
    <ScrollView flex={1} bg="secondary.800">
      <VStack>
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
            {group ? 'Edit Group' : 'Create New Group'}
          </Heading>
          <Button
            variant="ghost"
            colorScheme="primary"
            onPress={group ? onEdit : onSave}>
            {group ? 'Edit' : 'Save'}
          </Button>
        </HStack>
        <Center>
          {errors?.message && !loading && (
            <Text color="error.600" fontSize="xs">
              {errors?.message}
            </Text>
          )}
          <Avatar
            m="4"
            alignSelf="center"
            size="lg"
            source={{
              uri: formData.imageUrl,
            }}
            key={formData.imageUrl || 'groupImageAvatar'}>
            {formData.name === ''
              ? 'GN'
              : formData.name
                  .split(' ')
                  .map(function (item) {
                    return item[0];
                  })
                  .join('')
                  .substring(0, 2)
                  .toUpperCase()}
          </Avatar>
          <Heading color="primary.400" size="sm">
            {formData.name === '' ? 'Group Name' : formData.name}
          </Heading>
        </Center>
        <VStack px="4" py="2">
          <FormControl
            isInvalid={errors.name != null}
            isDisabled={loading || group !== undefined}>
            <HStack>
              <FormControl.Label _text={{color: 'primary.600'}} flex={1} mr="2">
                Group Name
              </FormControl.Label>
              <Input
                flex={3}
                color="text.100"
                p={0}
                variant="underlined"
                keyboardType="default"
                returnKeyType="next"
                autoCapitalize="none"
                value={formData.name}
                onChangeText={value => setFormString('name', value)}
                onSubmitEditing={() => {
                  secondTextInput?.current?.focus();
                }}
                blurOnSubmit={false}
              />
            </HStack>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {errors.name}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={errors.description != null}
            isDisabled={loading}>
            <FormControl.Label _text={{color: 'primary.600'}}>
              Description
            </FormControl.Label>
            <TextArea
              ref={secondTextInput}
              color="text.100"
              placeholder="Tell us what your group is all about"
              numberOfLines={4}
              w="100%"
              value={formData.description}
              isDisabled={loading}
              onChangeText={value => setFormString('description', value)}
              autoCompleteType={undefined}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {errors.description}
            </FormControl.ErrorMessage>
          </FormControl>
        </VStack>
      </VStack>
      <Pressable onPress={onInviteMember}>
        <HStack
          bg="primary.100"
          px="4"
          py="2"
          alignItems="center"
          justifyContent={'space-between'}>
          <Heading size="xs">Invite Member</Heading>
          <Icon size="sm" as={ChevronRight} color="black" />
        </HStack>
      </Pressable>
      {formData.joinedUser.map(item => (
        <MemberItem user={item} key={item.email} />
      ))}
      {formData.invitedUser.map(item => (
        <MemberItem user={item} isPending={true} key={item.email} />
      ))}
    </ScrollView>
  );
};

export default CreateGroupScreen;
