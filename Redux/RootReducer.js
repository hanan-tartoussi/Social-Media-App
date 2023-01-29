import {combineReducers} from 'redux';
import products from './Reducer';
import users from './UserReducer';
import post from './PostReducer';

export default combineReducers({
  posts: products,
  userdata: users,
  postdata: post,
});
