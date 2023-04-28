import {
  View,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {CustomTypes, Screens} from '../../util/enums';
import {registerUser} from '../../services/AuthService';
import LogoIcon from '../../components/LogoIcon/LogoIcon';
import {Formik, Field} from 'formik';
import * as yup from 'yup';

const SignUpScreen = ({navigation}: any) => {
  const {height} = useWindowDimensions();

  const [isLoading, setIsLoading] = useState(false);

  const onRegister = (
    username: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ) => {
    setIsLoading(true);
    registerUser(username, email, password, passwordConfirmation)
      .then(() => {
        navigation.push(Screens.SIGN_IN);
        setIsLoading(false);
      })
      .catch(res => {
        if (res.response.status === undefined) {
          Alert.alert(
            'Time out',
            'Server is unreachable at the moment! Pleas try again later!',
            [{text: 'OK', onPress: () => null}],
            {cancelable: true},
          );
        } else if (res.response.status === 409) {
          const errors = res.response.data.error.errors;

          const errorMessage = errors
            .map((error: {field: string; message: string}) => error.message)
            .join('\n');

          Alert.alert(
            'REgistration error',
            errorMessage,
            [{text: 'OK', onPress: () => null}],
            {cancelable: true},
          );
        }
        setIsLoading(false);
      });
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Email is not in valid format!')
      .required('Email is required!'),
    username: yup
      .string()
      .min(5, 'Username must contain at least 5 characters!')
      .max(30, 'Username must contain less then 30 characters!')
      .required('Username is required!'),
    password: yup
      .string()
      .min(8, 'Password must contain at least 8 characters!')
      .max(64, 'Password must contain less then 64 characters!')
      .required('Password is required!'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match!')
      .required('Password confirmation is required!'),
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.root, {height: height * 1}]}>
        <View style={[styles.logo, {height: height * 0.3}]}>
          <LogoIcon />
        </View>

        <Formik
          validationSchema={validationSchema}
          initialValues={{
            email: '',
            username: '',
            password: '',
            passwordConfirmation: '',
          }}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={values =>
            onRegister(
              values.username,
              values.email,
              values.password,
              values.passwordConfirmation,
            )
          }>
          {({handleSubmit, isValid}) => (
            <>
              <Field
                component={CustomInput}
                name="email"
                placeholder="Email"
                iconName="email-outline"
                iconSize={30}
              />

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

              <Field
                component={CustomInput}
                name="passwordConfirmation"
                placeholder="Confirm password"
                iconName="lock-outline"
                iconSize={30}
                isPassword
              />

              <CustomButton
                onPress={handleSubmit}
                text="Register"
                disabled={!isValid || isLoading}
                isLoading={isLoading}
              />
            </>
          )}
        </Formik>

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
