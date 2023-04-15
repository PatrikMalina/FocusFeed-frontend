import {View, Text, Button} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../../state/action-creators';
import {RootState} from '../../state';

const HomeScreen = () => {
  const token = useSelector((state: RootState) => state.token);
  const {removeToken, removeUser} = bindActionCreators(
    ActionCreators,
    useDispatch(),
  );

  const getCurr = () => {
    console.log('token curr', token);
  };
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
