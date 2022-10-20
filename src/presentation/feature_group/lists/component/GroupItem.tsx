import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Box, HStack, Avatar, Heading, Pressable} from 'native-base';
import React from 'react';
import {GetGroupDetails} from '../../../../domain/use_case/GetGroupDetails';
import {StackParamList} from '../../../utils/ScreenNavigation';

const GroupItem = (props: {groupName: string}) => {
  const {groupName} = props;
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  async function handlePress() {
    //const group = await GetGroupDetails(groupName);
    //navigation.navigate('createGroup', {group: group, user: user});
  }

  return (
    <Pressable onPress={handlePress}>
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
