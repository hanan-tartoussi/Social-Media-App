import {
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,
  FETCH_POSTS_DATA_SUCCESS
} from './ActionType';

export function fetchUserDataRequest() {
  return {
    type: FETCH_USER_DATA_REQUEST,
  };
}

export const fetchUserDataSuccess = user => async dispatch => {
   
    dispatch({
      type: FETCH_USER_DATA_SUCCESS,
      payload: user,
    });
};

export const fetchPostsDataSuccess = allPosts => async dispatch => {
  setTimeout(() => {
    dispatch({
      type: FETCH_POSTS_DATA_SUCCESS,
      payload: allPosts,
    });
  }, 2000);
};
