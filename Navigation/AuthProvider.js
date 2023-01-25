import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();
var AuthError = '';

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
            AuthError = e.message;
            console.log(e.message + ' ' + e.code);
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
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
