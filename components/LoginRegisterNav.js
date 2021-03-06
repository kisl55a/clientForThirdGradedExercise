import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Registration from './Registration';

const Stack = createStackNavigator();

const LoginRegisterNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" options={{ title: "Login", headerShown: false }}>
        {props => <Login {...props} />}
      </Stack.Screen>
      <Stack.Screen name="registration" options={{ title: 'Registration' , headerShown: false}} >
        {props => <Registration {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default LoginRegisterNav
