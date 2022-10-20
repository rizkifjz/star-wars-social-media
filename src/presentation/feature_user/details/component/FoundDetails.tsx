import {Box, Heading, HStack, Text} from 'native-base';
import React from 'react';
import {UserDetails} from '../../../../domain/model/UserDetails';

const FoundDetails = (props: {details: UserDetails}) => {
  const {details} = props;
  return (
    <Box width="100%">
      <HStack bg="primary.100" px="5" py="2" justifyContent={'space-between'}>
        <Heading size="xs">Birth Year</Heading>
        <Text>{details.birth_year}</Text>
      </HStack>
      <HStack
        bg="primary.100"
        px="5"
        py="2"
        justifyContent={'space-between'}
        mt="0.5">
        <Heading size="xs">Gender</Heading>
        <Text>{details.gender}</Text>
      </HStack>
      <HStack
        bg="primary.100"
        px="5"
        py="2"
        justifyContent={'space-between'}
        mt="4">
        <Heading size="xs">Height</Heading>
        <Text>{`${details.height} cm`}</Text>
      </HStack>
      <HStack
        bg="primary.100"
        px="5"
        py="2"
        justifyContent={'space-between'}
        mt="0.5">
        <Heading size="xs">Mass</Heading>
        <Text>{`${details.mass} kg`}</Text>
      </HStack>
      <HStack
        bg="primary.100"
        px="5"
        py="2"
        justifyContent={'space-between'}
        mt="4">
        <Heading size="xs">Eye Color</Heading>
        <Text>{`${details.eye_color}`}</Text>
      </HStack>
      <HStack
        bg="primary.100"
        px="5"
        py="2"
        justifyContent={'space-between'}
        mt="0.5">
        <Heading size="xs">Hair Color</Heading>
        <Text>{`${details.hair_color}`}</Text>
      </HStack>
      <HStack
        bg="primary.100"
        px="5"
        py="2"
        justifyContent={'space-between'}
        mt="0.5">
        <Heading size="xs">Skin Color</Heading>
        <Text>{`${details.skin_color}`}</Text>
      </HStack>
    </Box>
  );
};

export default FoundDetails;
