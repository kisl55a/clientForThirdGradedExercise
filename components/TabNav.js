import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import { Ionicons, Entypo, AntDesign } from 'react-native-vector-icons';
import Registration from './Registration';
import Search from './Search';
import Login from './Login';
import LoginRegisterNav from './LoginRegisterNav';
import { useSelector } from 'react-redux';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const TabNav = (props) => {
  const currentUser = useSelector(state => state.currentUser)
  // console.log('currentUser: ', currentUser);

  const registrationTab = () => {
    return (
      <Tab.Screen name="Registration"
        component={LoginRegisterNav}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="open-book" color={color} size={size} />)
        }}
      />
    )
  }
  const profileTab = () => {
    return(
      <Tab.Screen name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="user" color={color} size={size} />)
      }}
    />
    )
  }
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
      <Tab.Screen name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-search" color={color} size={size} />)
        }}
      />
      {
        (currentUser.username === '' ? registrationTab() : profileTab())
      }
    </Tab.Navigator>
  )
}

export default TabNav
