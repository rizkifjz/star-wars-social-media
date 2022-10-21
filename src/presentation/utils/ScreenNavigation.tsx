import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from '../feature_user/login/LoginScreen';
import RegisterScreen from '../feature_user/register/RegisterScreen';
import {Avatar, Icon} from 'native-base';
import {User} from '../../domain/model/User';
import {Users} from 'react-native-feather';
import MyDetailsScreen from '../feature_user/details/MyDetailsScreen';
import ListGroupsScreen from '../feature_group/lists/ListGroupsScreen';
import {Group} from '../../domain/model/Group';
import CreateGroupScreen from '../feature_group/create/CreateGroupScreen';
import InviteMemberScreen from '../feature_group/create/InviteMemberScreen';
import GroupDetailsScreen from '../feature_group/details/GroupDetailsScreen';

export type StackParamList = {
  login: undefined;
  register: undefined;
  home: {
    user: User;
  };
  createGroup: {
    user: User;
    group?: Group;
    invitedUser?: User[];
  };
  inviteMembers: {
    existingUser: User[];
  };
  groupDetails: {
    group: Group;
  };
};

interface Props {
  initial: keyof StackParamList;
}

const ScreenNavigation: React.FC<Props> = ({initial}) => {
  const Stack = createNativeStackNavigator<StackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={initial}>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />
        <Stack.Screen
          name="home"
          children={({navigation, route}) => (
            <HomeTab navigation={navigation} route={route} />
          )}
        />
        <Stack.Screen name="createGroup" component={CreateGroupScreen} />
        <Stack.Screen name="inviteMembers" component={InviteMemberScreen} />
        <Stack.Screen name="groupDetails" component={GroupDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

type Prop = NativeStackScreenProps<StackParamList, 'home'>;
const HomeTab = ({route}: Prop) => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="joinedGroups"
      backBehavior={'initialRoute'}
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="joinedGroups"
        children={({navigation}) => (
          <ListGroupsScreen navigation={navigation} route={route} />
        )}
        options={{
          tabBarActiveBackgroundColor: '#0f172a',
          tabBarActiveTintColor: '#ffe71a',
          tabBarInactiveTintColor: '#94a3b8',
          tabBarInactiveBackgroundColor: '#0f172a',
          tabBarLabel: 'Groups',
          tabBarIcon: ({color}) => <Icon as={Users} size="6" color={color} />,
        }}
      />
      <Tab.Screen
        name="userDetails"
        children={({navigation}) => (
          <MyDetailsScreen navigation={navigation} route={route} />
        )}
        options={{
          tabBarActiveBackgroundColor: '#0f172a',
          tabBarActiveTintColor: '#ffe71a',
          tabBarInactiveTintColor: '#94a3b8',
          tabBarInactiveBackgroundColor: '#0f172a',
          tabBarLabel: 'You',
          tabBarIcon: ({color}) => (
            <Avatar
              alignSelf="center"
              opacity={75}
              bg={color}
              size="6"
              source={{uri: route.params.user.imageUrl}}>
              N/A
            </Avatar>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ScreenNavigation;
