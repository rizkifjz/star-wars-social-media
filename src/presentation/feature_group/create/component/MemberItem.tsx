import {Box, HStack, Avatar, Heading, Pressable, Icon} from 'native-base';
import React from 'react';
import {CheckSquare} from 'react-native-feather';
import {User} from '../../../../domain/model/User';

const MemberItem = (props: {
  user: User;
  isSelected?: boolean;
  isPending?: boolean;
  onPress?: () => void;
}) => {
  const {user, isSelected, isPending, onPress} = props;
  return (
    <Pressable
      onPress={onPress && !isSelected ? onPress : () => {}}
      _pressed={{
        bg: 'primary.600:alpha.20',
      }}>
      <Box safeArea width="100%" px="4" py="2">
        <HStack alignItems="center" justifyContent={'space-between'}>
          <HStack alignItems="center">
            <Avatar
              alignSelf="center"
              bg="warmGray.300"
              size="sm"
              source={{
                uri: user.imageUrl,
              }}
              key={user.imageUrl || 'imageAvatar'}>
              N/A
            </Avatar>
            <Heading color="primary.400" size="sm" ml="4">
              {`${user.name}${isPending ? ' (Pending)' : ''}${
                onPress ? ` (${user.email})` : ''
              }`}
            </Heading>
          </HStack>
          {isSelected && (
            <Icon size="sm" as={CheckSquare} color="primary.600" mx="2" />
          )}
        </HStack>
      </Box>
    </Pressable>
  );
};

export default MemberItem;
