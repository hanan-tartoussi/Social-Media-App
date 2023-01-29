import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
} from './ActionType';

export function fetchDataRequest() {
  return {
    type: FETCH_DATA_REQUEST,
  };
}

// export function fetchDataSuccess(item) {
//   return {
//     type: FETCH_DATA_SUCCESS,
//     item,
//   };
// }

export const fetchDataSuccess = item => async dispatch => {
  setTimeout(() => {
    dispatch({
      type: FETCH_DATA_SUCCESS,
      payload: item,
    });
  }, 2000);
};

export function fetchDataError(error) {
  return {
    type: FETCH_DATA_ERROR,
    payload: {error},
  };
}
