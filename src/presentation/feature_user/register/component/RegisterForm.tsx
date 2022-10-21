import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  VStack,
  WarningOutlineIcon,
  Text,
  HStack,
  Select,
  Icon,
  Avatar,
} from 'native-base';
import React, {useRef} from 'react';
import {Keyboard} from 'react-native';
import {Check} from 'react-native-feather';
import {Job} from '../../../../domain/model/Job';
import useViewModel from '../RegisterViewModel';

const RegisterForm = (props: {onSuccess: Function}) => {
  const secondTextInput = useRef<any>(null);
  const thirdTextInput = useRef<any>(null);
  const fourthTextInput = useRef<any>(null);
  const jobs: Job[] = ['Jedi', 'Sith', 'Commander', 'General', 'Pilot'];
  const {formData, errors, loading, setForm, onSubmit, onGetImage} =
    useViewModel();

  return (
    <Box safeArea width="100%" px="5" pb="5">
      <VStack>
        <FormControl isInvalid={errors.name != null} isDisabled={loading}>
          <FormControl.Label _text={{color: 'primary.600'}}>
            Full Name
          </FormControl.Label>
          <Input
            color="text.100"
            p={0}
            variant="underlined"
            keyboardType="default"
            returnKeyType="next"
            autoCapitalize="none"
            onChangeText={value => setForm('name', value)}
            onSubmitEditing={() => {
              secondTextInput?.current?.focus();
            }}
            blurOnSubmit={false}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.name}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.job != null} isDisabled={loading} mt="2">
          <FormControl.Label _text={{color: 'primary.600'}}>
            Job Title
          </FormControl.Label>
          <Select
            placeholder="Choose Job"
            color="text.100"
            selectedValue={formData.job}
            _selectedItem={{
              bg: 'primary.100',
              endIcon: <Icon size="sm" as={Check} color="primary.600" />,
            }}
            onValueChange={value => setForm('job', value)}
            mt="1">
            {jobs.map(item => (
              <Select.Item label={item} value={item} key={item} />
            ))}
          </Select>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.job}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={errors.email != null}
          isDisabled={loading}
          mt="2">
          <FormControl.Label _text={{color: 'primary.600'}}>
            Email
          </FormControl.Label>
          <Input
            ref={secondTextInput}
            color="text.100"
            p={0}
            variant="underlined"
            keyboardType="email-address"
            returnKeyType="next"
            autoCapitalize="none"
            onChangeText={value => setForm('email', value)}
            onSubmitEditing={() => {
              thirdTextInput?.current?.focus();
            }}
            blurOnSubmit={false}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.email}
          </FormControl.ErrorMessage>
        </FormControl>
        <HStack>
          <VStack flex={3}>
            <FormControl
              isInvalid={errors.password != null}
              isDisabled={loading}
              mt="2">
              <FormControl.Label _text={{color: 'primary.600'}}>
                Password
              </FormControl.Label>
              <Input
                ref={thirdTextInput}
                color="text.100"
                p={0}
                variant="underlined"
                type="password"
                returnKeyType="next"
                autoCapitalize="none"
                onChangeText={value => setForm('password', value)}
                onSubmitEditing={() => {
                  fourthTextInput?.current?.focus();
                }}
                blurOnSubmit={false}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.password}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={errors.confirmPassword != null}
              isDisabled={loading}
              mt="2">
              <FormControl.Label _text={{color: 'primary.600'}}>
                Confirm Password
              </FormControl.Label>
              <Input
                ref={fourthTextInput}
                color="text.100"
                p={0}
                variant="underlined"
                type="password"
                returnKeyType="go"
                autoCapitalize="none"
                onChangeText={value => setForm('confirmPassword', value)}
                onSubmitEditing={() => Keyboard.dismiss()}
                blurOnSubmit={false}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.confirmPassword}
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>
          <FormControl
            flex={2}
            isInvalid={errors.imageUrl != null}
            isDisabled={loading}
            mt="2">
            <FormControl.Label _text={{color: 'primary.600'}}>
              Profile Picture
            </FormControl.Label>
            <Center>
              <Avatar
                alignSelf="center"
                bg="warmGray.300"
                size="xl"
                source={{
                  uri:
                    formData?.imageUrl !== '' ? formData?.imageUrl : undefined,
                }}
                key={formData?.imageUrl || 'imageAvatar'}>
                N/A
              </Avatar>
              <Button
                isDisabled={loading}
                mt="2"
                colorScheme="primary"
                onPress={onGetImage}>
                CAMERA
              </Button>
            </Center>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {errors.imageUrl}
            </FormControl.ErrorMessage>
          </FormControl>
        </HStack>
        {errors?.message && !loading && (
          <Center>
            <Text color="error.600" fontSize="xs" mt="4">
              {errors?.message}
            </Text>
          </Center>
        )}
      </VStack>
      <Button
        mt="4"
        height="50"
        colorScheme="primary"
        onPress={() => onSubmit(props.onSuccess)}
        isLoading={loading}
        _text={{bold: true}}
        _loading={{bg: 'primary.400:alpha.70'}}
        _spinner={{color: 'primary.900'}}>
        {loading ? '' : 'SUBMIT'}
      </Button>
    </Box>
  );
};

export default RegisterForm;
