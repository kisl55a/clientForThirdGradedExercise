import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabNav from './components/TabNav';
import { NavigationContainer } from '@react-navigation/native';



export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <TabNav></TabNav>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
