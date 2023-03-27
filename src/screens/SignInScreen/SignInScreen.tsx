import {View, Image, StyleSheet, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import {Logo} from '../../../assets/images';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {CustomTypes} from '../../util/enums';

function SignInScreen({navigation}: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {height} = useWindowDimensions();

  const onForgotPassword = () => {
    console.warn('onForgotPassword');
  };

  const onLogin = async (username: string, password: string) => {
    // navigation.push('')
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

      <CustomButton onPress={() => onLogin(username, password)} text="Login" />

      <CustomButton
        onPress={() => navigation.push('SignUp')}
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
  },
});

export default SignInScreen;
