import {
  fetchUserDataRequest,
  fetchUserDataSuccess,
  fetchPostsDataSuccess,
} from './Actions';
import {firebase} from '@react-native-firebase/database';
// const myArray = Object.values(snapshot.val());
// console.log(myArray);
// const sortedPostes = myArray.sort((a,b)=>{a.addedDate-b.addedDate});
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
        dispatch({type: 'SET_USER_ID', payload: userID});
        dispatch({type: 'SET_USER_NAME', payload: snapshot.val().name});
        dispatch({type: 'SET_USER_EMAIL', payload: snapshot.val().email});
        dispatch({type: 'SET_USER_BIO', payload: snapshot.val().bio});
        dispatch({
          type: 'SET_USER_PROFILE_IMAGE',
          payload: snapshot.val().userProfileImage,
        });
        console.log('FetchUser from fetch data: ', snapshot.val());
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
        const myArray = Object.values(snapshot.val());
        console.log(myArray);
        const sortedPostes = myArray.sort((a, b) => b.addedDate - a.addedDate);
        dispatch(fetchPostsDataSuccess(sortedPostes));
        console.log('Posts data: ', sortedPostes);
      });
  };
};
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
};
