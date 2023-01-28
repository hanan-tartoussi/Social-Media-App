import React, {useState, useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../Screen/LoginScreen';
import RegisterScreen from '../Screen/RegisterScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}

        // options={({navigation}) => ({
        //   title: '',
        //   headerStyle: {
        //     backgroundColor: '#f9fafd',
        //     shadowColor: '#f9fafd',
        //     elevation: 0,
        //   },
        // })}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
