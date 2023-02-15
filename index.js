/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import {applyMiddleware, createStore} from 'redux';
import RootReducer from './Redux/RootReducer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {AuthProvider} from './Navigation/AuthProvider';
import Routes from './Navigation/Routes';

const store = createStore(RootReducer, applyMiddleware(thunk));

const RNRedux = () => (
  <Provider store={store}>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
