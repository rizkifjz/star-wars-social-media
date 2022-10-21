import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Box,
  HStack,
  IconButton,
  Icon,
  Heading,
  ScrollView,
  useToast,
} from 'native-base';
import React from 'react';
import {ChevronLeft} from 'react-native-feather';
import {StackParamList} from '../../utils/ScreenNavigation';
import RegisterForm from './component/RegisterForm';

const RegisterScreen = () => {
  const toast = useToast();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const onPressBack = () => navigation.goBack();
  const onSuccess = () => {
    onPressBack();
    toast.show({
      title: 'Registration success! Please log in to start the adventure',
      placement: 'top',
    });
  };
  return (
    <Box flex={1} bg="secondary.800">
      <ScrollView>
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
            Register New Account
          </Heading>
          <Icon size="lg" color="transparent" />
        </HStack>
        <RegisterForm onSuccess={onSuccess} />
      </ScrollView>
    </Box>
  );
};

export default RegisterScreen;
