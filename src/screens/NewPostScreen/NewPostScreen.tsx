import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Button } from 'react-native'
import React, { useState } from 'react'
import { ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { createPost } from '../../services/AppService';
import { Screens } from '../../util/enums';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../components/CustomButton/CustomButton';

const options: ImageLibraryOptions = {
    mediaType: 'photo',
    includeBase64: true
  };
  
  const NewPostScreen = ({ navigation }: any) => {
    const [imageUri, setImageUri] = useState<string | undefined>(undefined)
    const [base64string, setBase64string] = useState<string | undefined>(undefined)
    const [caption, setCaption] = useState('')
  
    const ChoosePhoto = () => {
      launchImageLibrary(options, (response) => {
        if(response.assets){
            setImageUri(response.assets[0].uri)
            setBase64string(response.assets[0].base64)
        }
      });
    };
  
    const TakePhoto = () => {
      launchCamera(options, (response) => {
        if(response.assets){
            setImageUri(response.assets[0].uri)
            setBase64string(response.assets[0].base64)
        }
      });
    };
  
    const SendPost = (
        caption: string,
        base64string: string
    ) => {
      createPost(caption, base64string).then(res => {
        navigation.push(Screens.TAB_SCREENS);
      })
    };
  
    return (
      <View style={styles.container}>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        <View style={styles.buttonContainer}>
        <Icons name={'camera'} size={40} color={'black'} onPress={TakePhoto} style={{ marginHorizontal: 35}}/>
        <Icons name={'folder-image'} size={40} color={'black'} onPress={ChoosePhoto} style={{ marginHorizontal: 35}}/>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter caption..."
          value={caption}
          onChangeText={setCaption}
        />
        <CustomButton text='POST' onPress={() => {if (base64string) {SendPost(caption, base64string)} else {console.log(base64string);}}} />
        
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 10,
      padding: 10,
      marginBottom: 20,
      width: '100%',
    },
  });
  
  export default NewPostScreen;