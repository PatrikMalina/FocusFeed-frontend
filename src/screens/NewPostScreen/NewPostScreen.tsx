import { View, Text, StyleSheet, TextInput, Image, Button, Switch } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { createPost } from '../../services/AppService';
import { Screens } from '../../util/enums';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../components/CustomButton/CustomButton';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';

const options: ImageLibraryOptions = {
    mediaType: 'photo',
    includeBase64: true
  };

  
  
  const NewPostScreen = ({ navigation }: any) => {
    const [imageUri, setImageUri] = useState<string | undefined>(undefined)
    const [base64string, setBase64string] = useState<string | undefined>(undefined)
    const [caption, setCaption] = useState('')
    const [location, setLocation] = useState<{ latitude: number, longitude: number } | undefined>(undefined)
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {setIsEnabled(previousState => !previousState); getLocation()};

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

    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }

    const getLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }); 
        },
        error => {
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    };
  
    const SendPost = (
      caption: string,
      base64string: string,
      latitude: number | undefined,
      longitude: number | undefined,
      isEnabled: boolean
    ) => {
      if (isEnabled && latitude && longitude) {
        createPost(caption, base64string, latitude, longitude).then(res => {
          navigation.push(Screens.TAB_SCREENS);
        })
      } else if (!isEnabled) {
        createPost(caption, base64string, undefined, undefined).then(res => {
          navigation.push(Screens.TAB_SCREENS);
        })
      }
    };
    useEffect(() => {
      requestLocationPermission()
    }, [])
  
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
        <Text>{isEnabled ? 'Location sharing is ON' : 'Location sharing is OFF'}</Text>
        <Switch
        onValueChange={toggleSwitch}
        value={isEnabled}
        />
        <CustomButton text='POST' onPress={() => {if (base64string) {SendPost(caption, base64string, location?.latitude, location?.longitude, isEnabled)} else {console.log(base64string);}}} />
        
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