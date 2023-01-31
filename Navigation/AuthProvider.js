import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import {Alert} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    // we will create different state for the authentication (login, register, and logout)
    // the value will be passed to other components within the components tree
    <AuthContext.Provider
      value={{
        user, //within the provider value,I have added the user state, so we can set this user from any other file
        setUser,
        login: async (email, password) => {
          try {
            if (email !== '' && password !== '') {
              await auth().signInWithEmailAndPassword(email, password);
            } else {
              Alert.alert('Login error', 'Please fill out the Login form');
            }
          } catch (e) {
            Alert.alert('Login error', e.message);
            console.log(e.message + ' ' + e.code);
          }
        },
        register: async (email, password, username) => {
          try {
            if (email !== '' && password !== '') {
              await auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                  const reference = firebase
                    .app()
                    .database(
                      'https://socialmediaapp-79d46-default-rtdb.europe-west1.firebasedatabase.app/',
                    )
                    .ref('/Users/' + auth().currentUser.uid);

                  reference
                    .set({
                      userid: auth().currentUser.uid,
                      email: email,
                      name: username,
                      image: '',
                    })
                    .catch(error => {
                      console.log(
                        'Something went wrong with added user to firestore: ',
                        error,
                      );
                    })
                    .then(() => console.log('Data updated.'));
                });
            } else {
              Alert.alert(
                'Signup error',
                'Please fill out the registration form',
              );
            }
          } catch (e) {
            Alert.alert('Signup error', e.message);
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
