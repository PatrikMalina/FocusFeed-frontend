import {View, StyleSheet, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {CustomTypes, Screens} from '../../util/enums';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../../state/action-creators';
import {loginUser} from '../../services/AuthService';
import LogoIcon from '../../components/LogoIcon/LogoIcon';

function SignInScreen({navigation}: any) {
  const {setToken} = bindActionCreators(ActionCreators, useDispatch());

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {height} = useWindowDimensions();

  const onForgotPassword = () => {
    console.warn('onForgotPassword');
  };

  const onLogin = async (username: string, password: string) => {
    loginUser(username, password)
      .then(res => {
        const token = res.data;
        setToken(token);
      })
      .catch(res => {
        console.warn(res.error);
      });
  };

  return (
    <View style={styles.root}>
      <View style={[styles.logo, {height: height * 0.4}]}>
        <LogoIcon />
      </View>

      <CustomInput
        placeholder="Username"
        value={username}
        setValue={setUsername}
        iconName="account-outline"
        iconSize={30}
      />
      <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        iconName="lock-outline"
        iconSize={30}
        isPassword
      />

      <CustomButton onPress={() => onLogin(username, password)} text="Login" />

      <CustomButton
        onPress={() => navigation.push(Screens.SIGN_UP)}
        text="New? Register here!"
        type={CustomTypes.TERTIARY}
      />

      <CustomButton
        onPress={onForgotPassword}
        text="Forgot Password?"
        type={CustomTypes.TERTIARY}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '50%',
    maxWidth: 400,
    height: 200,
    justifyContent: 'center',
  },
});

export default SignInScreen;
