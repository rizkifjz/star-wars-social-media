import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  VStack,
  WarningOutlineIcon,
  Text,
} from 'native-base';
import React, {useRef} from 'react';
import useViewModel from '../LoginViewModel';

const LoginForm = () => {
  const secondTextInput = useRef<any>(null);
  const {errors, loading, setForm, onSubmit} = useViewModel();

  return (
    <Box safeArea width="100%">
      <VStack bg="primary.50" padding="5" borderRadius={'10'}>
        <FormControl isInvalid={errors.email != null} isDisabled={loading}>
          <Input
            bg="white"
            variant="outline"
            placeholder="Email Address"
            keyboardType="email-address"
            returnKeyType="next"
            autoCapitalize="none"
            onChangeText={value => setForm(value, null)}
            onSubmitEditing={() => {
              secondTextInput?.current?.focus();
            }}
            blurOnSubmit={false}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.email}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={errors.password != null}
          isDisabled={loading}
          mt="2">
          <Input
            ref={secondTextInput}
            bg="white"
            variant="outline"
            placeholder="Password"
            type="password"
            returnKeyType="go"
            autoCapitalize="none"
            onChangeText={value => setForm(null, value)}
            onSubmitEditing={onSubmit}
            blurOnSubmit={false}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.password}
          </FormControl.ErrorMessage>
        </FormControl>
        {errors?.message && !loading && (
          <Center>
            <Text color="error.600" fontSize="xs" mt="4">
              {errors?.message}
            </Text>
          </Center>
        )}
        <Button
          mt="4"
          height="50"
          colorScheme="primary"
          onPress={onSubmit}
          isLoading={loading}
          _loading={{bg: 'primary.500:alpha.70'}}
          _spinner={{color: 'primary.900'}}>
          {loading ? '' : 'LOGIN'}
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginForm;
