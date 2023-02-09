import {
  fetchUserDataRequest,
  fetchUserDataSuccess,
  fetchPostsDataSuccess,
} from './Actions';
import { firebase } from '@react-native-firebase/database';
// const myArray = Object.values(snapshot.val());
// console.log(myArray);
// myArray.sort(()=>{})
export const fetchUser = userID => {
  return dispatch => {
    //console.log('auth().uid from fetchData', userID);
    dispatch(fetchUserDataRequest());
    firebase
      .app()
      .database(
        'https://socialmediaapp-79d46-default-rtdb.europe-west1.firebasedatabase.app/',
      )
      .ref('/Users/' + userID)
      .on('value', snapshot => {
        console.log('user details changed', snapshot.val())
       // dispatch(fetchUserDataSuccess(snapshot.val()));
        dispatch({type: 'SET_USER_ID', payload: userID});
        dispatch({type: 'SET_USER_NAME', payload: snapshot.val().name});
        dispatch({type: 'SET_USER_EMAIL', payload: snapshot.val().email});
        dispatch({type: 'SET_USER_BIO', payload: snapshot.val().bio});
        dispatch({
          type: 'SET_USER_PROFILE_IMAGE',
          payload: snapshot.val().userProfileImage,
        });
        //console.log('User name from fetch data: ', snapshot.val().name);
      });
  };
};

export const fetchPosts = () => {

  return dispatch => {
    firebase
      .app()
      .database(
        'https://socialmediaapp-79d46-default-rtdb.europe-west1.firebasedatabase.app/',
      )
      .ref('/Posts')
      .on('value', snapshot => {
        dispatch(fetchPostsDataSuccess(Object.values(snapshot.val())));
        console.log('Posts data: ', Object.values(snapshot.val()));
      });
  };
}
export const fetchUsers = () => {

  return dispatch => {
    firebase
      .app()
      .database(
        'https://socialmediaapp-79d46-default-rtdb.europe-west1.firebasedatabase.app/',
      )
      .ref('/Users')
      .on('value', snapshot => {
        dispatch(fetchUserDataSuccess(snapshot.val()));
        console.log('Users data: ', Object.values(snapshot.val()));
      });
  };
}
