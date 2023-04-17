import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {CustomTypes, Screens} from '../../util/enums';
import {registerUser} from '../../services/AuthService';
import LogoIcon from '../../components/LogoIcon/LogoIcon';

const SignUpScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {height} = useWindowDimensions();

  const onRegister = (
    username: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ) => {
    registerUser(username, email, password, passwordConfirmation)
      .then(res => {
        console.log(res.data);
        navigation.push(Screens.SIGN_IN);
      })
      .catch(res => {
        console.warn(res.err);
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <View style={[styles.logo, {height: height * 0.3}]}>
          <LogoIcon />
        </View>

        <CustomInput
          placeholder="Email"
          value={email}
          setValue={setEmail}
          iconName="email-outline"
          iconSize={30}
        />

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
        <CustomInput
          placeholder="Confirm password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          iconName="lock-outline"
          iconSize={30}
          isPassword
        />

        <CustomButton
          onPress={() => onRegister(username, email, password, confirmPassword)}
          text="Register"
        />

        <CustomButton
          onPress={() => navigation.push(Screens.SIGN_IN)}
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
