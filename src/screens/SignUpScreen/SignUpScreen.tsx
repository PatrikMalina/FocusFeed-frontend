import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Logo} from '../../../assets/images';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import {API_URL} from '@env';
import {CustomTypes} from '../../util/enums';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from '../../state/store';
import * as ActionCreators from '../../state/action-creators';
import {User} from '../../util/interface';

const SignUpScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {height} = useWindowDimensions();

  const state = useSelector((state: RootState) => state.user);
  const {signIn} = bindActionCreators(ActionCreators, useDispatch());

  const onRegister = (
    username: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ) => {
    console.log('on register');

    axios
      .post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
        passwordConfirmation,
      })
      .then(res => {
        let user = res.data;
        console.log(user);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onTest = () => {
    const user: User = {id: 1, picture_url: '', username: 'name'};
    signIn(user);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />

        <Text>{state === undefined ? 'undefined' : state?.username}</Text>

        <CustomInput placeholder="Email" value={email} setValue={setEmail} />
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
        <CustomInput
          placeholder="Confirm password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          isPassword
        />

        <CustomButton
          onPress={() => onRegister(username, email, password, confirmPassword)}
          text="Register"
        />
        <CustomButton onPress={() => onTest()} text="test" />

        <CustomButton
          onPress={() => navigation.push('SignIn')}
          text="Have an account? Login here!"
          type={CustomTypes.TERTIARY}
        />
      </View>
    </ScrollView>
  );
};

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

export default SignUpScreen;
