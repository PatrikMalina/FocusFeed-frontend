import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar, Text} from 'react-native-paper';
import AppColors from '../../styling/AppColors';
import {Screens} from '../../util/enums';
import {API_URL} from '@env';
import {Chat} from '../../util/interface';
import store, {RootState} from '../../state/store';
import {formatDistance} from 'date-fns';
import {useSelector} from 'react-redux';
import Lottie from 'lottie-react-native';

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
  const messages = useSelector((state: RootState) => state.messages);
  const lastMessage =
    messages[chat.id] === undefined ? undefined : messages[chat.id][0];

  const friend =
    chat.user_1.id !== store.getState().user?.id ? chat.user_1 : chat.user_2;

  const relativeDate = () => {
    if (lastMessage) {
      const dateValue = new Date(lastMessage.createdAt);
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
          <Text style={styles.lastText}>{lastMessage?.content}</Text>
          <Text style={styles.lastSeen}>{relativeDate()}</Text>
        </View>
      </View>
    </View>
  );
};

const EmptyChat = () => {
  return (
    <View style={{height: '40%'}}>
      <Lottie
        source={require('../../../assets/animations/empty_chat.json')}
        autoPlay
        loop
      />
    </View>
  );
};

const ContactsScreen = ({navigation}: any) => {
  const chats: Chat[] = useSelector((state: RootState) => state.chats);
  const messages = useSelector((state: RootState) => state.messages);

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
        {chats.length < 1 ? (
          <>
            <EmptyChat />
            <Text style={[styles.text, {fontWeight: 'bold', fontSize: 25}]}>
              Nothing Here
            </Text>
            <Text style={styles.text}>There are no chats in your feed.</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text style={styles.text}>To create chats press </Text>
              <Pressable onPress={() => navigation.push(Screens.FRIENDS)}>
                <Text style={[styles.text, {color: AppColors.BUTTON_PRIMARY}]}>
                  here
                </Text>
              </Pressable>
              <Text style={styles.text}>And select a friend</Text>
            </View>
          </>
        ) : (
          <FlatList
            data={chats}
            extraData={[chats, messages]}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigation.push(Screens.CHAT, {chat: item})}>
                <CustomUser chat={item} />
              </TouchableOpacity>
            )}
          />
        )}
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

  text: {
    alignSelf: 'center',
    color: AppColors.INPUT_BORDER_COLOR,
    fontSize: 15,
    opacity: 0.6,
  },
});
