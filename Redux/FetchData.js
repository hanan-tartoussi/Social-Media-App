import {fetchDataRequest, fetchDataSuccess, fetchDataError} from './Actions';
import {firebase} from '@react-native-firebase/database';

export const fetchUser = userID => {
  return dispatch => {
    console.log('auth().uid from fetchData', userID);
    dispatch(fetchDataRequest());
    firebase
      .app()
      .database(
        'https://socialmediaapp-79d46-default-rtdb.europe-west1.firebasedatabase.app/',
      )
      .ref('/Users/' + userID)
      .on('value', snapshot => {
        dispatch(fetchDataSuccess(snapshot.val()));
        dispatch({type: 'SET_USER_ID', payload: userID});
        console.log('User data: ', snapshot.val());
      });
    // .catch(error => {
    //   dispatch(fetchDataError(error));
    // });
  };
};
