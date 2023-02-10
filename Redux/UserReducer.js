let initialState = {
  loading: false,
  user_id: null,
  name: null,
  email: null,
  bio: null,
  userProfileImage: null,
  error: '',
  users:{}
};
import { FETCH_USER_DATA_SUCCESS } from "./ActionType";
function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        users: payload,
        loading: true,
      };
    case 'SET_USER_ID':
      return { ...state, user_id: payload };
    case 'SET_USER_NAME':
      return { ...state, name: payload };
    case 'SET_USER_EMAIL':
      return { ...state, email: payload };
    case 'SET_USER_PROFILE_IMAGE':
      return { ...state, userProfileImage: payload };
    case 'SET_USER_BIO':
      return { ...state, bio: payload };
    default:
      return state;
  }
}

export default reducer;
