let initialState = {
  loading: false,
  user_id: [],
  post_id: [],
  username: null,
  caption: null,
  allPosts: [],
  error: '',
};

function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case 'SET_POST_DATA':
      return {
        ...state,
        ...payload,
        loading: true,
      };
    case 'SET_POST_ID':
      return {...state, post_id: payload};
    case 'SET_POST_USER_NAME':
      return {...state, username: payload};
    case 'SET_POST_USER_ID':
      return {...state, user_id: payload};
    case 'SET_POST_CAPTION':
      return {...state, caption: payload};
    case 'FETCH_POSTS_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        allPosts: payload,
      };
    case 'SET_POST_ERROR':
      return {...state, error: payload};
    default:
      return state;
  }
}

export default reducer;
