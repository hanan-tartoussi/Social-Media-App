let initialState = {
  loading: false,
  user_id: [],
  post_id: [],
  username: null,
  caption: null,
  error: '',
};

function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        ...payload,
      };
    case 'SET_POST_ID':
      return {...state, post_id: payload};
    case 'SET_POST_USER_NAME':
      return {...state, username: payload};
    case 'SET_POST_USER_ID':
      return {...state, user_id: payload};
    default:
      return state;
  }
}

export default reducer;
