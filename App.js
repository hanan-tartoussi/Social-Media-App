import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Providers from './Navigation';
import AppStack from './Navigation/AppStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <>

      <GestureHandlerRootView style={{ flex: 1 }}>
        <Providers />
      </GestureHandlerRootView>
      {/* <NavigationContainer>
        <AppStack />
      </NavigationContainer> */}
    </>
  );
}
