import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabNav from './components/TabNav';
import { NavigationContainer } from '@react-navigation/native';
import { createStore } from 'redux';
import {Provider} from 'react-redux'
import rootReducer from './src/reducers'


const store = createStore(rootReducer)

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer style={styles.container}>
      <TabNav></TabNav>
    </NavigationContainer>
    </Provider>

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
