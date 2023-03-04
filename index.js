/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

import { applyMiddleware, createStore } from 'redux';
import RootReducer from './Redux/RootReducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { AuthProvider } from './Navigation/AuthProvider';
import Routes from './Navigation/Routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const store = createStore(RootReducer, applyMiddleware(thunk));

const RNRedux = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Provider>
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => RNRedux);
