let initialState = {
  loading: false,
  user_id: [],
  name: null,
  posts: [],
  error: '',
};

function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        ...payload,
      };
    case 'SET_USER_ID':
      return {...state, user_id: payload};

    default:
      return state;
  }
}

export default reducer;
