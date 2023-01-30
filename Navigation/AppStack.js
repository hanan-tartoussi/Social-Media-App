import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../Screen/HomeScreen';
import AddPost from '../Screen/AddPost';
//import AddPost from '../Pages/AddPost';

const Tab = createMaterialBottomTabNavigator();

export default function AppStack() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#5b637b"
      barStyle={{backgroundColor: '#fff'}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <MaterialIcons name="home" color="#5b637b" size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="New Post"
        component={AddPost}
        options={{
          tabBarLabel: 'New Post',
          tabBarIcon: () => (
            <MaterialIcons name="plus" color="#5b637b" size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
