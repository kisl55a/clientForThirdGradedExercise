import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile';
import ProfileItemBig from './ProfileItemBig';
import ProfileItemSmall from './ProfileItemSmall';

const Stack = createStackNavigator();

const LoginRegisterNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" options={{ title: 'Profile' }} >
        {props => <Profile {...props} />}
      </Stack.Screen>

      <Stack.Screen name="Item" options={{ title: "Item" }}>
        {props => <ProfileItemBig {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default LoginRegisterNav
