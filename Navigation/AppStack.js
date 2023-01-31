import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../Screen/HomeScreen';
import AddPost from '../Screen/AddPost';
import Profile from '../Screen/Profile';
//import AddPost from '../Pages/AddPost';
import ProfileScreen from '../Screen/ProfileScreen';
const Tab = createMaterialBottomTabNavigator();

export default function AppStack() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#5b637b"
      barStyle={{ backgroundColor: '#fff' }
      }
    >
      <Tab.Screen
        name="Home"
        barStyle={{backgroundColor: '#fff'}}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <MaterialIcons name="home" color="#5b637b" size={24} />
          ),

        }}
      />
      <Tab.Screen name="New Post" component={AddPost}
      options={{
          tabBarLabel: 'New Post',
          tabBarIcon: () => (
            <MaterialIcons name="add" color="#5b637b" size={24} />
          ),

        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <MaterialIcons name="person" color="#5b637b" size={24} />
          ),

        }}
      />
    </Tab.Navigator>
  );
}
