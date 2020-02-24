import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import { Ionicons, Entypo } from 'react-native-vector-icons';
import Registration from './Registration';
import Search from './Search';
import Login from './Login';
const Tab = createBottomTabNavigator();

const TabNav = (props) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" color={color} size={size} />)
        }}
      />
      <Tab.Screen name="Registration"
        component={Registration}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="open-book" color={color} size={size} />)
        }}
      />
     <Tab.Screen name="Login"
        component={Login}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="login" color={color} size={size} />)
        }}
      />
      <Tab.Screen name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-search" color={color} size={size} />)
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNav
