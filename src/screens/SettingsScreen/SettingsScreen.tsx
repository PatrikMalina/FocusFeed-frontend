import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Icons from 'react-native-vector-icons/AntDesign';
import CustomInput from '../../components/CustomInput';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import { updateProfile } from '../../services/AppService';
import { Screens } from '../../util/enums';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import CustomButton from '../../components/CustomButton';

const options: ImageLibraryOptions = {
    mediaType: 'photo',
    includeBase64: true
  };
  
type UpdateProfileData = {
    picture?: string;
    username?: string;
    email?: string;
    password?: string;
  };

const SettingsScreen = ({ navigation: {goBack}, navigation }: any) => {
    const [imageUri, setImageUri] = useState<string | undefined>(undefined)
    const [base64string, setBase64string] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const onUpdateProfile = (
        username: string,
        email: string,
        password: string,
        picture: string) => {
            const data: UpdateProfileData = {};

            if (picture) {
                data['picture'] = picture;
              }
            
              if (username) {
                data['username'] = username;
              }
            
              if (email) {
                data['email'] = email;
              }
            
              if (password) {
                data['password'] = password;
              }
            console.log();
            
            updateProfile(data).then(res => {
                navigation.push(Screens.TAB_SCREENS)
              })
              .catch(res => {
                console.warn(res.err);
              });
          
      };
    
      const ChoosePhoto = () => {
        launchImageLibrary(options, (response) => {
          if(response.assets){
              setImageUri(response.assets[0].uri)
              setBase64string(response.assets[0].base64 || '')
          }
        });
      };

      const validationSchema = yup.object().shape({
        email: yup
          .string()
          .email('Email is not in valid format!'),
        username: yup
          .string()
          .min(5, 'Username must contain at least 5 characters!')
          .max(30, 'Username must contain less then 30 characters!'),
        password: yup
          .string()
          .min(8, 'Password must contain at least 8 characters!')
          .max(64, 'Password must contain less then 64 characters!'),
      });

  return (
    <View>
    <View style={{ margin: 5 }}>
      <Icons name={'left'} size={40} color={'black'} onPress={() => goBack()} />
    </View>
    <View style={{alignItems: 'center', padding: 20}}>
    <View>
      <Text style={styles.font}>Change Profile Picture:</Text>
      <Button title="Choose Picture" onPress={ChoosePhoto} />
    </View>
    <Formik
          validationSchema={validationSchema}
          initialValues={{
            email: '',
            username: '',
            password: '',
          }}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={values =>
            onUpdateProfile(
              values.username,
              values.email,
              values.password,
              base64string
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

              <CustomButton
                onPress={handleSubmit}
                text="Update"
                disabled={!isValid || isLoading}
                isLoading={isLoading}
              />
            </>
          )}
        </Formik>
  </View>
  </View>
  )
}

const styles = StyleSheet.create({
    font: {
      fontSize: 16
    },
  });

export default SettingsScreen