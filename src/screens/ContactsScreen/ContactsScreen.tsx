import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar, Text} from 'react-native-paper';
import AppColors from '../../styling/AppColors';
import {Screens} from '../../util/enums';

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

interface UserChat {
  user: {
    id: number;
    username: string;
    picture_url: string;
    last_message?: string;
  };
}

const CustomUser = ({user}: UserChat) => {
  return (
    <View style={styles.item}>
      <Avatar.Image size={60} source={{uri: user.picture_url}} />
      <View style={styles.user}>
        <Text style={styles.username}>{user.username}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.lastText}>{user.last_message}</Text>
          <Text style={styles.lastSeen}>{'6min ago'}</Text>
        </View>
      </View>
    </View>
  );
};

const ContactsScreen = ({navigation}: any) => {
  const users = [
    {
      id: 1,
      username: 'johndoe',
      picture_url: 'https://randomuser.me/api/portraits/men/1.jpg',
      last_message: 'Last msg',
    },
    {
      id: 2,
      username: 'janedoe',
      picture_url: 'https://randomuser.me/api/portraits/women/2.jpg',
      last_message: 'Last msg',
    },
    {
      id: 3,
      username: 'bobsmith',
      picture_url: 'https://randomuser.me/api/portraits/men/3.jpg',
      last_message: 'Last msg',
    },
    {
      id: 4,
      username: 'sarahjones',
      picture_url: 'https://randomuser.me/api/portraits/women/4.jpg',
      last_message: 'Last msg',
    },
    {
      id: 5,
      username: 'mikebrown',
      picture_url: 'https://randomuser.me/api/portraits/men/5.jpg',
      last_message: 'Last msg',
    },
    {
      id: 6,
      username: 'emilytaylor',
      picture_url: 'https://randomuser.me/api/portraits/women/6.jpg',
      last_message: 'Last msg',
    },
    {
      id: 7,
      username: 'davidlee',
      picture_url: 'https://randomuser.me/api/portraits/men/7.jpg',
      last_message: 'Last msg',
    },
    {
      id: 8,
      username: 'amywright',
      picture_url: 'https://randomuser.me/api/portraits/women/8.jpg',
      last_message: 'Last msg',
    },
    {
      id: 9,
      username: 'petersmith',
      picture_url: 'https://randomuser.me/api/portraits/men/9.jpg',
      last_message: 'Last msg',
    },
    {
      id: 10,
      username: 'lisawilson',
      picture_url: 'https://randomuser.me/api/portraits/women/10.jpg',
      last_message: 'Last msg',
    },
  ];

  useEffect(() => {}, []);

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <CustomSearch />
        <View style={styles.iconPerson}>
          <MaterialIcons.Button
            backgroundColor={AppColors.DEFAULT_BACKGROUND}
            name="account-plus"
            size={40}
            color="black"
            onPress={() => navigation.push(Screens.FRIENDS)}
          />
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={users}
          renderItem={({item}) => <CustomUser user={item} />}
        />
      </View>
    </>
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  user: {
    paddingLeft: '10%',
  },

  username: {
    fontSize: 20,
  },

  lastText: {
    opacity: 0.8,
    fontSize: 14,
  },

  lastSeen: {
    paddingLeft: '45%',
  },

  item: {
    marginBottom: 30,
    paddingHorizontal: 20,
    fontSize: 18,
    height: 44,
    flexDirection: 'row',
  },

  search: {
    borderColor: '#d4d4d4',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    width: '70%',
    marginVertical: '10%',
    marginLeft: '5%',
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

  iconPerson: {
    alignSelf: 'center',
    marginHorizontal: '5%',
  },
});
