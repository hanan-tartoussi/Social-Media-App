import {
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,
  FETCH_POSTS_DATA_SUCCESS,
} from './ActionType';

export function fetchUserDataRequest() {
  return {
    type: FETCH_USER_DATA_REQUEST,
  };
}

export const fetchUserDataSuccess = user => async dispatch => {
  setTimeout(() => {
    dispatch({
      type: FETCH_USER_DATA_SUCCESS,
      payload: user,
    });
  }, 2000);
};

export const fetchPostsDataSuccess = allPosts => async dispatch => {
  setTimeout(() => {
    dispatch({
      type: FETCH_POSTS_DATA_SUCCESS,
      payload: allPosts,
    });
  }, 2000);
};
