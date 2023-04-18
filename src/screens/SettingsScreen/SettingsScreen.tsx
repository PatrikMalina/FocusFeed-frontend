import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Icons from 'react-native-vector-icons/AntDesign';
import CustomInput from '../../components/CustomInput';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import { updateProfile } from '../../services/AppService';
import { Screens } from '../../util/enums';
import store from '../../state/store';

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
    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [imageUri, setImageUri] = useState<string | undefined>(undefined)
    const [base64string, setBase64string] = useState('')

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
                console.log(res.data)
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
    <View style={{marginTop: 10}}>
    <Text style={styles.font}>Change Email:</Text>
    <CustomInput
          placeholder="Email"
          value={newEmail}
          setValue={setNewEmail}
          iconName="email-outline"
          iconSize={30}
        />
    </View>
    <View>
      <Text style={styles.font}>Change Username:</Text>
      <CustomInput
          placeholder="Username"
          value={newUsername}
          setValue={setNewUsername}
          iconName="account-outline"
          iconSize={30}
        />
    </View>
    <View>
      <Text style={styles.font}>Change Password:</Text>
      <CustomInput
          placeholder="Password"
          value={newPassword}
          setValue={setNewPassword}
          iconName="lock-outline"
          iconSize={30}
          isPassword
        />
    </View>
    <Button title="Save Changes" onPress={() => onUpdateProfile(newUsername, newEmail, newPassword, base64string)} />
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