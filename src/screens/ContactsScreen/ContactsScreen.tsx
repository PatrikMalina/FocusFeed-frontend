import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar, Text} from 'react-native-paper';
import AppColors from '../../styling/AppColors';
import {Screens} from '../../util/enums';
import {getChats, getLastMessage} from '../../services/AppService';
import {API_URL} from '@env';
import {Chat} from '../../util/interface';
import store from '../../state/store';
import {formatDistance} from 'date-fns';

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

const CustomUser = ({chat}: {chat: Chat}) => {
  const friend =
    chat.user_1.id !== store.getState().user?.id ? chat.user_1 : chat.user_2;

  const relativeDate = () => {
    if (chat.lastMessage) {
      const dateValue = new Date(chat.lastMessage?.createdAt);
      return formatDistance(dateValue, new Date(), {
        addSuffix: true,
      });
    }
  };

  return (
    <View style={styles.item}>
      <Avatar.Image
        size={60}
        source={{uri: `${API_URL}/${friend.pictureUrl}`}}
      />
      <View style={styles.user}>
        <Text style={styles.username}>{friend.username}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.lastText}>{chat.lastMessage?.content}</Text>
          <Text style={styles.lastSeen}>{relativeDate()}</Text>
        </View>
      </View>
    </View>
  );
};

const ContactsScreen = ({navigation}: any) => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    getChats().then(res => {
      setChats(res.data);

      let copyChats = Object.assign([], res.data);

      copyChats.forEach((chat: Chat) => {
        getLastMessage(chat.id).then(res => {
          chat.lastMessage = res.data;
          setChats(copyChats);
        });
      });
    });
  }, []);

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
          data={chats}
          renderItem={({item}) => <CustomUser chat={item} />}
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
    paddingLeft: '5%',
  },

  username: {
    fontSize: 20,
  },

  lastText: {
    opacity: 0.8,
    fontSize: 14,
    width: '50%',
  },

  lastSeen: {
    marginLeft: '2%',
    marginRight: '2%',
    width: '30%',
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
