import {combineReducers} from 'redux';
import products from './Reducer';
import users from './UserReducer';

export default combineReducers({
  posts: products,
  userdata: users,
});
