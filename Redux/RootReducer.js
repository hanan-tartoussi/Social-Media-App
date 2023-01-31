import {combineReducers} from 'redux';
import products from './Reducer';
import users from './UserReducer';
import post from './PostReducer';

export default combineReducers({
  userTabInfo: products,
  userdata: users,
  postdata: post,
});
