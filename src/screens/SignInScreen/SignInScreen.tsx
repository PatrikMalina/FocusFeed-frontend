import {View, StyleSheet, useWindowDimensions} from 'react-native';
import React from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {CustomTypes, Screens} from '../../util/enums';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../../state/action-creators';
import {loginUser} from '../../services/AuthService';
import LogoIcon from '../../components/LogoIcon/LogoIcon';
import {Formik, Field} from 'formik';
import * as yup from 'yup';

function SignInScreen({navigation}: any) {
  const {setToken} = bindActionCreators(ActionCreators, useDispatch());

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

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(5, 'Username must contain at least 5 characters!')
      .max(30, 'Username must contain less then 30 characters!')
      .required('Username is required!'),
    password: yup
      .string()
      .min(8, 'Password must contain at least 8 characters!')
      .max(64, 'Password must contain less then 64 characters!')
      .required('password is required!'),
  });

  return (
    <View style={styles.root}>
      <View style={[styles.logo, {height: height * 0.4}]}>
        <LogoIcon />
      </View>

      <Formik
        validationSchema={validationSchema}
        initialValues={{
          username: '',
          password: '',
        }}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={values => onLogin(values.username, values.password)}>
        {({handleSubmit, isValid}) => (
          <>
            <Field
              component={CustomInput}
              name="username"
              placeholder="Username"
              iconName="account-outline"
              iconSize={30}
            />

            <Field
              component={CustomInput}
              name="password"
              placeholder="Password"
              iconName="lock-outline"
              iconSize={30}
              isPassword
            />

            <CustomButton
              onPress={handleSubmit}
              text="Login"
              disabled={!isValid}
            />
          </>
        )}
      </Formik>

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
