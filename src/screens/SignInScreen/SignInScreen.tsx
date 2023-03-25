import {View, Image, StyleSheet, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import {Logo} from '../../../assets/images';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {CustomTypes} from '../../util';

function SignInScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {height} = useWindowDimensions();

  const onSignInPressed = () => {
    console.warn('Sign in');
  };

  const onForgotPasswordPressed = () => {
    console.warn('onForgotPasswordPressed');
  };

  return (
    <View style={styles.root}>
      <Image
        source={Logo}
        style={[styles.logo, {height: height * 0.3}]}
        resizeMode="contain"
      />

      <CustomInput
        placeholder="Username"
        value={username}
        setValue={setUsername}
      />
      <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        isPassword
      />

      <CustomButton onPress={onSignInPressed} text="Login" />

      <CustomButton
        onPress={onForgotPasswordPressed}
        text="New? Register here!"
        type={CustomTypes.TERTIARY}
      />

      <CustomButton
        onPress={onForgotPasswordPressed}
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
  },
});

export default SignInScreen;
