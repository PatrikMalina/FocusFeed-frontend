import {View, Text, Button} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../../state/action-creators';

const HomeScreen = () => {
  const {removeToken, removeUser} = bindActionCreators(
    ActionCreators,
    useDispatch(),
  );

  return (
    <View>
      <Text>Signed in!</Text>
      <Button
        title="Sign out"
        onPress={() => {
          removeToken();
          removeUser();
        }}
      />
    </View>
  );
};

export default HomeScreen;
