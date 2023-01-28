import {fetchDataRequest, fetchDataSuccess, fetchDataError} from './Actions';

export const fetchUser = ({userID}) => {
  return dispatch => {
    console.log('auth().uid from fetchData', userID);
    dispatch(fetchDataRequest());
    firebase
      .app()
      .database(
        'https://socialmediaapp-79d46-default-rtdb.europe-west1.firebasedatabase.app/',
      )
      .ref('/Users/user' + {userID})
      .on('value', snapshot => {
        dispatch(fetchDataSuccess(snapshot.val()));
        console.log('User data: ', snapshot.val());
      })
      .catch(error => {
        dispatch(fetchDataError(error));
      });
    // axios
    //   .get('http://fakestoreapi.com/products')
    //   .then(response => {
    //     dispatch(fetchDataSuccess(response.data));
    //   })
    //   .catch(error => {
    //     dispatch(fetchDataError(error));
    //   });
  };
};
