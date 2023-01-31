let initialState = {
  loading: false,
  user: [],
  error: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_USER_DATA_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_USER_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case 'FETCH_USER_DATA_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        user: [],
      };
    default:
      return state;
  }
}

export default reducer;
