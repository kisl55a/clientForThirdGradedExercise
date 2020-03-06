import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import { Ionicons, Entypo, AntDesign } from 'react-native-vector-icons';
import Search from './Search';
import LoginRegisterNav from './LoginRegisterNav';
import { useSelector } from 'react-redux';
import ProfileNav from './ProfileNav';

const Tab = createBottomTabNavigator();

const TabNav = (props) => {
  const currentUser = useSelector(state => state.currentUser)
  // console.log('currentUser: ', currentUser);

  const registrationTab = () => {
    return (
      <Tab.Screen name="Login"
        component={LoginRegisterNav}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="login" color={color} size={size} />)
        }}
      />
    )
  }
  const profileTab = () => {
    return(
      <Tab.Screen name="Profile"
      component={ProfileNav}
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
      {/* <Tab.Screen name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-search" color={color} size={size} />)
        }}
      /> */}
      {
        (currentUser.username === '' ? registrationTab() : profileTab())
      }
    </Tab.Navigator>
  )
}

export default TabNav
