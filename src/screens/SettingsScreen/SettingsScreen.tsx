import {View, Text, Button, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Icons from 'react-native-vector-icons/AntDesign';
import CustomInput from '../../components/CustomInput';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {updateProfile} from '../../services/AppService';
import {Screens} from '../../util/enums';
import store from '../../state/store';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import CustomButton from '../../components/CustomButton';

const options: ImageLibraryOptions = {
  mediaType: 'photo',
  includeBase64: true,
};

type UpdateProfileData = {
  picture: string;
  username: string;
  email: string;
  password: string;
};

const SettingsScreen = ({navigation: {goBack}, navigation}: any) => {
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [base64string, setBase64string] = useState('');

  const currentUser = store.getState().user;

  const onUpdateProfile = (
    username: string,
    email: string,
    password: string,
    picture: string,
  ) => {
    if (picture === '') return;

    const data: UpdateProfileData = {picture, username, password, email};

    updateProfile(data)
      .then(res => {
        console.log(res.data);
        navigation.push(Screens.TAB_SCREENS);
      })
      .catch(res => {
        console.warn(res.err);
      });
  };

  const ChoosePhoto = () => {
    launchImageLibrary(options, response => {
      if (response.assets) {
        setImageUri(response.assets[0].uri);
        setBase64string(response.assets[0].base64 || '');
      }
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
  });

  return (
    <View>
      <View style={{margin: 5}}>
        <Icons
          name={'left'}
          size={40}
          color={'black'}
          onPress={() => goBack()}
        />
      </View>
      <View
        style={{
          alignSelf: 'center',
          paddingHorizontal: 40,
          height: '120%',
        }}>
        <View
          style={{
            marginVertical: 10,
          }}>
          <Text style={{fontSize: 16}}>Change Profile Picture:</Text>
          <Button title="Choose Picture" onPress={ChoosePhoto} />
        </View>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            email: currentUser?.email ? currentUser.email : '',
            username: currentUser ? currentUser.username : '',
            password: '',
          }}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={values =>
            onUpdateProfile(
              values.username,
              values.email,
              values.password,
              base64string,
            )
          }>
          {({handleSubmit, isValid}) => (
            <>
              <Text style={styles.font}>Change Email:</Text>
              <Field
                component={CustomInput}
                name="email"
                placeholder="Email"
                iconName="email-outline"
                iconSize={30}
              />
              <Text style={styles.font}>Change Username:</Text>
              <Field
                component={CustomInput}
                name="username"
                placeholder="Username"
                iconName="account-outline"
                iconSize={30}
              />
              <Text style={styles.font}>Change Password:</Text>
              <Field
                component={CustomInput}
                name="password"
                placeholder="Password"
                iconName="lock-outline"
                iconSize={30}
                isPassword
              />

              <View style={{alignSelf: 'center'}}>
                <CustomButton
                  onPress={handleSubmit}
                  text="Save Changes"
                  disabled={!isValid || base64string === ''}
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  font: {
    marginBottom: -20,
    fontSize: 16,
  },
});

export default SettingsScreen;
