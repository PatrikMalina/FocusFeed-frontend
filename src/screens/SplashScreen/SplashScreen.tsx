import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {Text, View} from 'react-native';
import {Token} from '../../util/interface';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../../state/action-creators';

function SplashScreen({
  setLoading,
}: {
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const {setToken} = bindActionCreators(ActionCreators, useDispatch());

  const getToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@token');

      if (jsonValue != null) {
        const token: Token = JSON.parse(jsonValue);

        setToken(token, false);
      }

      setLoading(false);
    } catch (e) {
      console.warn(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

export default SplashScreen;
