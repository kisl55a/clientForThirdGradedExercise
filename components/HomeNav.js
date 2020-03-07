import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import ProfileItemBig from './ProfileItemBig';

const Stack = createStackNavigator();

const HomeNav = () => {
  return (
    <Stack.Navigator
  
    >
      <Stack.Screen name="Home" options={{ title: 'Home', headerShown: false }} >
        {props => <Home {...props} />}
        
      </Stack.Screen>
      <Stack.Screen name="Item" options={({ route }) => ({ title: route.params.title })}>
        {props => <ProfileItemBig {...props} home={true}/>}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default HomeNav
