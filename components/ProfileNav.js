import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile';
import ProfileItemBig from './ProfileItemBig';
import CreateNewItem from './CreateNewItem';
import EditItem from './EditItem';

const Stack = createStackNavigator();

const ProfileNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" options={{ title: 'Profile', headerShown: false }} >
        {props => <Profile {...props} />}
      </Stack.Screen>

      <Stack.Screen name="Item"  options={({ route }) => ({ title: route.params.title })}>
        {props => <ProfileItemBig {...props} home={false}/>}
      </Stack.Screen>
      <Stack.Screen name="CreateNewItem" options={{ title: "Create new item" }}>
        {props => <CreateNewItem {...props} />}
      </Stack.Screen>
      <Stack.Screen name="EditItem" options={{ title: "Edit item" }}>
        {props => <EditItem {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default ProfileNav
