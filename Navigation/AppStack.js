import React, { useState } from 'react';
import { View, Dimensions}  from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../Screen/HomeScreen';
import AddPost from '../Screen/AddPost';
import EditProfileScreen from '../Screen/EditProfileScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionic from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
const { width, height } = Dimensions.get("window")
const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();
export default function AppStack() {
  return (
    <View style={{
      width,
      height,
    }}>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#5b637b"
        barStyle={{ backgroundColor: '#fff', height: '7%', marginBottom: 30 }}
        screenOptions={{
          keyboardHidesTabBar: true
        }}

      >
        <Tab.Screen
          name="Home"
          barStyle={{ backgroundColor: '#fff' }}
          component={HomeScreen}
          options={{
            tabBarLabel: null,
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="home"
                color={focused ? '#f57c00' : '#5b637b'}
                size={25}
              />
            ),
          }}
        />
        <Tab.Screen
          name="New Post"
          component={AddPost}
          options={{
            tabBarLabel: null,
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="add"
                color={focused ? '#f57c00' : '#5b637b'}
                size={30}
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
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="person"
                color={focused ? '#f57c00' : '#5b637b'}
                size={30}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
export const EditProfile = () => {
  const name = useSelector(state => state.userdata.name);
  const [username, setUsername] = useState(name);
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
        options={({ navigation, route }) => ({
          title: route?.params?.title,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'white',
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionic name="close-outline" style={{ fontSize: 35 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={()=>route?.params?.editProfile?.()}>
              <Ionic name="checkmark" style={{ fontSize: 35, color: '#f57c00' }} />
            </TouchableOpacity>
          )
        })}
      >
        {props => <EditProfileScreen username={username} name={name} setUsername={setUsername} {...props}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
