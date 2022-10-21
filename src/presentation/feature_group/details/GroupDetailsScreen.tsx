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
  IconButton,
  Icon,
  VStack,
  ScrollView,
  Spinner,
  Text,
} from 'native-base';
import React from 'react';
import {ChevronLeft} from 'react-native-feather';
import {VictoryPie} from 'victory-native';
import {StackParamList} from '../../utils/ScreenNavigation';
import useViewModel from './GroupDetailsViewModel';

type Props = NativeStackScreenProps<StackParamList, 'groupDetails'>;
const GroupDetailsScreen = ({route}: Props) => {
  const {group} = route.params;
  const {chartData, starships, loading} = useViewModel(group);

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const onPressBack = () => navigation.goBack();

  return (
    <ScrollView flex={1} bg="secondary.800">
      <HStack
        px="2"
        pt="2"
        alignItems={'center'}
        justifyContent={'space-between'}>
        <IconButton
          w="10%"
          icon={<Icon size="sm" as={ChevronLeft} color="primary.400" />}
          onPress={onPressBack}
        />
        <Heading color="primary.400" size="sm">
          Group Details
        </Heading>
        <Box w="10%" />
      </HStack>
      <Center>
        <HStack alignItems="center">
          <Avatar alignSelf="center" size="md">
            {group.name
              .split(' ')
              .map(function (item) {
                return item[0];
              })
              .join('')
              .substring(0, 2)
              .toUpperCase()}
          </Avatar>
          <Heading color="primary.400" size="lg" px="2">
            {group.name}
          </Heading>
        </HStack>
      </Center>
      <Box
        borderWidth="1"
        borderColor="primary.50"
        borderRadius={4}
        p="2"
        m="4">
        <VStack alignItems={'flex-start'}>
          <Heading color="primary.600" size="sm">
            {`Members: ${group.joinedUser.length} people`}
          </Heading>
          <Avatar.Group max={10} _avatar={{size: 'sm'}}>
            {group.joinedUser.map(item => (
              <Avatar source={{uri: item.imageUrl}} key={item.email} />
            ))}
          </Avatar.Group>
          {chartData && (
            <Center w="100%">
              <VictoryPie
                data={chartData}
                labels={({datum}) => `${datum.name}: ${datum.population}`}
                style={{
                  labels: {fill: 'white', fontWeight: 'bold'},
                }}
                height={200}
                x="name"
                y="population"
                colorScale="heatmap"
                labelPlacement="perpendicular"
              />
            </Center>
          )}
        </VStack>
      </Box>
      <Box
        borderWidth="1"
        borderColor="primary.50"
        borderRadius={4}
        p="2"
        m="4">
        <Heading color="primary.600" size="sm">
          {`Starship Used by ${group.name}`}
        </Heading>
        {loading && (
          <Center flex={1}>
            <Spinner size="lg" />
          </Center>
        )}
        <Text color="primary.400" mt="2">
          {starships}
        </Text>
      </Box>
    </ScrollView>
  );
};

export default GroupDetailsScreen;
