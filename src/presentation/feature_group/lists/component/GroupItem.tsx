import {Box, HStack, Avatar, Heading, Pressable} from 'native-base';
import React from 'react';

const GroupItem = (props: {groupName: string; onPress?: () => void}) => {
  const {groupName, onPress} = props;

  return (
    <Pressable
      onPress={onPress ? onPress : () => {}}
      _pressed={{
        bg: 'primary.600:alpha.20',
      }}>
      <Box safeArea width="100%" px="4" py="2">
        <HStack alignItems="center">
          <Avatar alignSelf="center" size="sm">
            {groupName
              .split(' ')
              .map(function (item) {
                return item[0];
              })
              .join('')
              .substring(0, 2)
              .toUpperCase()}
          </Avatar>
          <Heading color="primary.400" size="sm" ml="4">
            {groupName}
          </Heading>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default GroupItem;
