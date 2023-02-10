import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../Screen/HomeScreen';
import AddPost from '../Screen/AddPost';
//import AddPost from '../Pages/AddPost';
import EditProfileScreen from '../Screen/EditProfileScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();
export default function AppStack() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#5b637b"
      barStyle={{backgroundColor: '#fff'}}>
      <Tab.Screen
        name="Home"
        barStyle={{backgroundColor: '#fff'}}
        component={HomeScreen}
        options={{
          tabBarLabel: null,
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="home"
              color={focused ? '#f57c00' : '#5b637b'}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="New Post"
        component={AddPost}
        options={{
          tabBarLabel: null,
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="add"
              color={focused ? '#f57c00' : '#5b637b'}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={EditProfile}
        options={{
          tabBarLabel: null,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="person"
              color={focused ? '#f57c00' : '#5b637b'}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export const EditProfile = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
