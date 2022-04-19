import React from 'react';
import {SafeAreaView} from 'react-native';
import UserList from './features/userlist/UserList';
import {Provider as ReduxProvider} from 'react-redux';
import store from './app/store';
const App = () => {
  return (
    <SafeAreaView>
      <ReduxProvider store={store}>
        <UserList />
      </ReduxProvider>
    </SafeAreaView>
  );
};

export default App;
