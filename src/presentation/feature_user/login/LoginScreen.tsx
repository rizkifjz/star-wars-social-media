import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, Center, VStack, Text} from 'native-base';
import React from 'react';
import StarWarsLogo from '../../images/StarWarsLogo';
import {StackParamList} from '../../utils/ScreenNavigation';
import LoginForm from './component/LoginForm';

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const onNavigate = () => navigation.navigate('register');
  return (
    <Center flex={1} bg="secondary.800" padding="5">
      <StarWarsLogo height="15%" />
      <Text fontSize="lg" color="primary.400" mb="2">
        Social Media
      </Text>
      <LoginForm />
      <VStack
        bg="primary.50"
        padding="5"
        borderRadius={'10'}
        mt="2"
        width="100%">
        <Center>
          <Text>{"You don't have an account?"}</Text>
        </Center>
        <Button mt="2" height="45" onPress={onNavigate} colorScheme="secondary">
          {'JOIN NOW'}
        </Button>
      </VStack>
    </Center>
  );
};

export default LoginScreen;
