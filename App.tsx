import React from 'react';
import {Provider} from 'react-redux';
import AppNavigation from './src/navigation/AppNavigation';
import store from './src/state/store';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
      <Toast position="top" />
    </>
  );
};

export default App;
