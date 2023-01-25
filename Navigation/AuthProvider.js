import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';

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
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e.message + ' ' + e.code);
          }
        },
        register: async (email, password) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                const reference = firebase
                  .app()
                  .database(
                    'https://socialmediaapp-79d46-default-rtdb.europe-west1.firebasedatabase.app/',
                  )
                  .ref('/Users/user' + auth().currentUser.uid)
                  .push();

                reference
                  .set({
                    userid: auth().currentUser.uid,
                    email: email,
                    name: '',
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
          } catch (e) {
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
