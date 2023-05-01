import {FlatList, StyleSheet, TextInput, View} from 'react-native';
import {Text} from 'react-native-elements';
import {Chat, Message, User} from '../../util/interface';
import store, {RootState} from '../../state/store';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppColors from '../../styling';
import {Avatar} from 'react-native-paper';
import {API_URL} from '@env';
import {useState} from 'react';
import ChatService from '../../services/ChatService';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../../state/action-creators';
import {getMessages} from '../../services/AppService';
import {useNetInfo} from '@react-native-community/netinfo';

const TopHeader = ({goBack, friend}: {goBack: any; friend: User}) => {
  return (
    <View style={styles.topHeader}>
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

      <Text style={styles.username}>{friend.username}</Text>

      <Avatar.Image
        style={styles.topAvatar}
        size={60}
        source={{uri: `${API_URL}/${friend.pictureUrl}`}}
      />
    </View>
  );
};

const MessageBobble = ({message, friend}: {message: Message; friend: User}) => {
  const sentByMe = message.createdBy === store.getState().user?.id;
  const currentUser = store.getState().user;

  return (
    <View
      style={{marginTop: 20, flexDirection: sentByMe ? 'row-reverse' : 'row'}}>
      {message.offline ? (
        <MaterialIcons
          size={20}
          name="send-clock-outline"
          style={{alignSelf: 'flex-end', margin: 2}}
        />
      ) : (
        <></>
      )}
      <Avatar.Image
        size={30}
        source={{
          uri: `${API_URL}/${
            sentByMe ? currentUser?.pictureUrl : friend.pictureUrl
          }`,
        }}
      />
      <View
        style={[
          styles.messageBobble,
          sentByMe ? styles.myBobble : styles.friendsBobble,
          message.offline ? {opacity: 0.5} : {},
        ]}>
        <Text style={{fontSize: 16}}>{message.content}</Text>
      </View>
    </View>
  );
};

const InputMessage = ({setFocus, sendMessage}: any) => {
  const [message, setMessage] = useState('');

  return (
    <View style={styles.inputContainer}>
      <TextInput
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => setFocus(false)}
        placeholder="Type a message..."
        value={message}
        onChangeText={setMessage}
        style={styles.input}
      />
      <MaterialIcons.Button
        disabled={message === ''}
        iconStyle={{paddingVertical: 2}}
        backgroundColor={styles.inputContainer.backgroundColor}
        name="send"
        size={35}
        style={styles.iconSend}
        color="black"
        onPress={() => {
          if (message) {
            sendMessage(message);
            setMessage('');
          }
        }}
      />
    </View>
  );
};

const ChatScreen = ({route, navigation: {goBack}}: any) => {
  const {addMessages, loadMessages} = bindActionCreators(
    ActionCreators,
    useDispatch(),
  );

  const chat: Chat = route.params.chat;
  const friend =
    chat.user_1.id !== store.getState().user?.id ? chat.user_1 : chat.user_2;

  const [isFocused, setIsFocused] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [index, setIndex] = useState(0);
  const messages = useSelector((state: RootState) => state.messages)[
    chat.id
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const netInfo = useNetInfo();

  function sendMessage(message: string) {
    if (!netInfo.isConnected) {
      const last: Message = messages[0];

      const id = index - 1;

      setIndex(id);

      const msg: Message = {
        id: id,
        createdBy: store.getState().user!.id,
        content: message,
        createdAt: new Date().toString(),
        offline: true,
      };

      addMessages(msg, chat.id);

      return;
    }

    ChatService.in(chat.id)
      ?.addMessage(message)
      .then(res => {
        addMessages(res, chat.id);
      })
      .catch(e => {
        console.log(e);
      });
  }

  function loadMore() {
    if (!fetching || !netInfo.isConnected) return;

    setIsRefreshing(true);
    let perPage = 5;

    const len = messages.length;

    if (len < perPage) return;

    const offset = len % perPage;

    if (offset !== 0) perPage += offset;

    const paging = (len - offset) / perPage + 1;

    getMessages(chat.id, paging, perPage)
      .then(res => {
        if (res.data.length < perPage) setFetching(false);

        const offsetMessages = res.data.slice(offset);

        loadMessages(offsetMessages, chat.id);
        setIsRefreshing(false);
      })
      .catch(e => {
        console.warn(e);
      });
  }

  return (
    <View>
      <TopHeader goBack={goBack} friend={friend} />
      <View
        style={[
          styles.container,
          {height: isFocused ? '65%' : styles.container.height},
        ]}>
        <FlatList
          data={messages}
          extraData={messages}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          renderItem={({item}) => (
            <MessageBobble message={item} friend={friend} />
          )}
          inverted
          showsVerticalScrollIndicator={false}
          refreshing={isRefreshing}
        />
      </View>

      <View style={{alignSelf: 'center'}}>
        <InputMessage setFocus={setIsFocused} sendMessage={sendMessage} />
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '78%',
    marginVertical: '4%',
    alignSelf: 'center',
  },

  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '2%',
  },

  iconArrow: {
    marginHorizontal: '2%',
    alignSelf: 'flex-start',
  },

  username: {
    fontSize: 25,
    color: 'black',
    width: '60%',
  },

  topAvatar: {
    marginHorizontal: '3%',
  },

  inputContainer: {
    borderColor: '#d4d4d4',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    width: '95%',
    backgroundColor: '#d4d4d4',
  },

  input: {
    paddingVertical: '2%',
    width: '85%',
    color: 'black',
  },

  iconSend: {
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 0,
  },

  messageBobble: {
    padding: 10,
    borderRadius: 20,
    marginTop: 5,
    marginHorizontal: '1%',
    maxWidth: '70%',
  },

  myBobble: {
    backgroundColor: '#75A4FF',
    alignSelf: 'flex-end',
  },

  friendsBobble: {
    backgroundColor: '#dedede',
    alignSelf: 'flex-start',
  },
});
