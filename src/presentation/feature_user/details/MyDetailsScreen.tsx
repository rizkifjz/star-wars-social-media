import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  Box,
  Heading,
  Center,
  Avatar,
  HStack,
  Text,
  Spinner,
  Button,
} from 'native-base';
import React from 'react';
import {StackParamList} from '../../utils/ScreenNavigation';
import FoundDetails from './component/FoundDetails';
import useViewModel from './MyDetailsViewModel';

type Props = NativeStackScreenProps<StackParamList, 'home'>;
const MyDetailsScreen = ({route}: Props) => {
  const {user} = route.params;
  const {details, loading, errors} = useViewModel(user);

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const onLogOut = () =>
    navigation.reset({
      index: 0,
      routes: [{name: 'login'}],
    });

  return (
    <Box flex={1} bg="secondary.800">
      <HStack justifyContent={'space-between'} alignItems="flex-start">
        <Box w="25%" />
        <Center>
          <Avatar
            m="2"
            alignSelf="center"
            bg="warmGray.300"
            size="xl"
            source={{
              uri: user.imageUrl,
            }}
            key={user.imageUrl || 'imageAvatar'}>
            N/A
          </Avatar>
          <Heading color="primary.400" size="sm">
            {user.name}
          </Heading>
        </Center>
        <Button w="25%" colorScheme="danger" variant="ghost" onPress={onLogOut}>
          Log Out
        </Button>
      </HStack>
      <HStack
        bg="primary.100"
        px="5"
        py="2"
        justifyContent={'space-between'}
        mt="2">
        <Heading size="xs">Job Title</Heading>
        <Text>{user.job}</Text>
      </HStack>
      {loading && (
        <Center flex={1}>
          <Spinner size="lg" />
        </Center>
      )}
      {errors && !loading && (
        <Center flex={1}>
          <Text color="error.600">{errors}</Text>
        </Center>
      )}
      {details && !loading && <FoundDetails details={details} />}
    </Box>
  );
};

export default MyDetailsScreen;
