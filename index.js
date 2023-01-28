/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// import {applyMiddleware, createStore} from 'redux';
// import RootReducer from './Redux/RootReducer';
// import thunk from 'redux-thunk';
// import {Provider} from 'react-redux';

// const store = createStore(RootReducer, applyMiddleware(thunk));

const RNRedux = () => (
  // <Provider store={store}>
  <App />
  //</Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
