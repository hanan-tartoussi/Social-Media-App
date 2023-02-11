import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import RNBootSplash from 'react-native-bootsplash';
const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
    //when our app is establishing a connection with firebase
    //within that time we will return null, because its not determining which page it want to display.
  }

  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
