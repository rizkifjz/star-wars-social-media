import {Box, HStack, Avatar, Heading} from 'native-base';
import React from 'react';
import {User} from '../../../../domain/model/User';

const MemberItem = (props: {user: User}) => {
  const {user} = props;
  return (
    <Box safeArea width="100%" px="4" py="2">
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
          {user.name}
        </Heading>
      </HStack>
    </Box>
  );
};

export default MemberItem;
