import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Providers from './Navigation';
import AppStack from './Navigation/AppStack';

export default function App() {
  return (
    <>
      <Providers />
      {/* <NavigationContainer>
        <AppStack />
      </NavigationContainer> */}
    </>
  );
}
