import {
  fetchUserDataRequest,
  fetchUserDataSuccess,
  fetchPostsDataSuccess,
} from './Actions';
import {firebase} from '@react-native-firebase/database';

export const fetchUser = userID => {
  return dispatch => {
    console.log('auth().uid from fetchData', userID);
    dispatch(fetchUserDataRequest());
    firebase
      .app()
      .database(
        'https://socialmediaapp-79d46-default-rtdb.europe-west1.firebasedatabase.app/',
      )
      .ref('/Users/' + userID)
      .on('value', snapshot => {
        dispatch(fetchUserDataSuccess(snapshot.val()));
        dispatch({type: 'SET_USER_ID', payload: userID});
        dispatch({type: 'SET_USER_NAME', payload: snapshot.val().name});
        dispatch({type: 'SET_USER_EMAIL', payload: snapshot.val().email});
        console.log('User data: ', snapshot.val());
        console.log('User name from fetch data: ', snapshot.val().name);
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
        dispatch(fetchPostsDataSuccess(snapshot.val()));
        console.log('Posts data: ', snapshot.val());
      });
  };
};
