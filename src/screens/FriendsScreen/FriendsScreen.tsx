import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import AppColors from '../../styling';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-paper';
import CustomFriends from '../../components/CustomFriends/CustomFriends';

const CustomSearch = () => {
  return (
    <View style={styles.search}>
      <TextInput placeholder="Search users" style={styles.input} />
      <MaterialIcons
        name="magnify"
        size={20}
        style={styles.iconSearch}
        color="black"
      />
    </View>
  );
};

const ContactsScreen = ({navigation: {goBack}}: any) => {
  const [isYours, setIsYours] = useState(true);
  const [searchText, setSearchText] = useState('');

  const changeTab = () => {
    setIsYours(!isYours);
  };

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.iconArrow}>
          <MaterialIcons.Button
            backgroundColor={AppColors.DEFAULT_BACKGROUND}
            name="chevron-left"
            size={50}
            color="black"
            style={{paddingHorizontal: 0}}
            onPress={() => goBack()}
          />
        </View>

        <CustomSearch />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 20,
        }}>
        <Button
          mode="outlined"
          textColor="black"
          disabled={isYours}
          style={styles.button}
          onPress={() => changeTab()}>
          Your Friends
        </Button>

        <Button
          mode="outlined"
          textColor="black"
          disabled={!isYours}
          style={styles.button}
          onPress={() => changeTab()}>
          New Friends
        </Button>
      </View>
      <View style={styles.container}>
        {isYours ? <CustomFriends /> : <></>}
      </View>
    </>
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  button: {
    width: '35%',
    borderRadius: 10,
  },

  search: {
    borderColor: '#d4d4d4',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    width: '75%',
    marginVertical: '10%',
    paddingLeft: '2%',
    backgroundColor: '#d4d4d4',
  },

  input: {
    width: '90%',
    paddingVertical: 5,
    color: 'black',
  },

  iconSearch: {
    alignSelf: 'center',
  },

  iconArrow: {
    alignSelf: 'center',
    marginLeft: '2%',
  },
});
