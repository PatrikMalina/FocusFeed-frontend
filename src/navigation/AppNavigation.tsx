import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import {Screens} from '../util/enums';
import {RootState} from '../state';
import {useDispatch, useSelector} from 'react-redux';
import {Chat, Token} from '../util/interface';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import CommentScreen from '../screens/CommentScreen';
import FriendsScreen from '../screens/FriendsScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import ContactsScreen from '../screens/ContactsScreen';
import NewPostScreen from '../screens/NewPostScreen/NewPostScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import * as ActionCreators from '../state/action-creators';
import {bindActionCreators} from 'redux';
import ActivityService from '../services/ActivityService';
import {
  checkMe,
  getChats,
  getFriends,
  getMessages,
} from '../services/AppService';
import ChatScreen from '../screens/ChatScreen';
import ChatService from '../services/ChatService';
import {SocketManager} from '../services/SocketManager';
import store from '../state/store';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import {API_URL} from '../services/Config';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {headerShown: false};

const TabScreens = () => {
  return (
    <Tab.Navigator
      initialRouteName={Screens.HOME}
      screenOptions={({route}): any => ({
        headerShown: false,
        tabBarIcon: ({focused, size}: any) => {
          let iconName = '';
          let routName = route.name;

          if (routName === Screens.HOME) {
            iconName = focused ? 'home' : 'home-outline';
          }

          if (routName === Screens.CONTACTS) {
            iconName = focused ? 'message' : 'message-outline';
          }

          if (routName === Screens.NEW_POST) {
            iconName = focused ? 'plus-box' : 'plus-box-outline';
          }

          if (routName === Screens.PROFILE) {
            iconName = focused ? 'account' : 'account-outline';
          }
          return <Icons name={iconName} size={size} color={'black'} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name={Screens.HOME} component={HomeScreen} />
      <Tab.Screen name={Screens.NEW_POST} component={NewPostScreen} />
      <Tab.Screen name={Screens.CONTACTS} component={ContactsScreen} />
      <Tab.Screen name={Screens.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppStack = () => {
  const {setChats, setMessages, setUser, setFriends, addMessages} =
    bindActionCreators(ActionCreators, useDispatch());

  const [isFirst, setIsFirst] = useState(true);
  const [isInternetReachable, setIsInternetReachable] = useState<
    boolean | null
  >(false);

  const chats: Chat[] = useSelector((state: RootState) => state.chats);

  const initialization = () => {
    NetInfo.configure({
      reachabilityUrl: API_URL,
      reachabilityTest: async response => response?.status === 200,
      reachabilityLongTimeout: 60 * 1000, // 60s
      reachabilityShortTimeout: 2 * 1000, // 5s
      reachabilityRequestTimeout: 5 * 1000, // 5s
      reachabilityShouldRun: () => true,
      useNativeReachability: false,
    });

    // Get the current user information
    checkMe()
      .then(res => {
        if (res?.data !== undefined) {
          setUser(res.data);
        }
      })
      .catch(e => console.warn(e));

    // Make a websocket connection
    SocketManager.createManager(API_URL);
    SocketManager.boot();
    ActivityService.connectSocket();

    // Get all chats and messages related to the chats
    getChats()
      .then(res => {
        if (res?.data === undefined) return;

        const chats: Chat[] = res.data;
        setChats(chats);

        chats.forEach((chat: Chat) => {
          ChatService.join(chat.id);

          getMessages(chat.id)
            .then(res => {
              if (res?.data === undefined) return;

              setMessages(res.data, chat.id);
            })
            .catch(e => console.warn(e));
        });
        setIsFirst(false);
      })
      .catch(e => console.warn(e));

    // Get friends
    getFriends()
      .then(res => {
        if (res?.data === undefined) return;
        setFriends(res.data);
      })
      .catch(error => {
        console.warn(error);
      });
  };

  useEffect(() => {
    initialization();

    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsInternetReachable(state.isInternetReachable);
    });

    return () => {
      ActivityService.disconnectSocket();
      const chats: Chat[] = store.getState().chats;

      chats.forEach(chat => {
        ChatService.leave(chat.id);
      });

      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isInternetReachable && !isFirst) {
      chats.forEach(chat => {
        getMessages(chat.id)
          .then(res => {
            if (res?.data === undefined) return;
            setMessages(res.data, chat.id);
          })
          .catch(e => console.warn(e));

        const offlineMessages = store
          .getState()
          .messages[chat.id].filter(msg => msg.offline === true)
          .reverse();

        offlineMessages.forEach(async (msg, index) => {
          setTimeout(async () => {
            await ChatService.in(chat.id)
              ?.addMessage(msg.content)
              .then(res => {
                addMessages(res, chat.id);
              })
              .catch(e => {
                console.log(e);
              });
          }, 1000 * (index + 1));
        });
      });
    } else if (isInternetReachable === false && !isFirst) {
      Toast.show({
        type: 'info',
        text1: 'The device has lost connection to the internet.',
        text2: 'When device reconnects, it will send all un send messages.',
        visibilityTime: 6000,
      });
    }
  }, [isInternetReachable]);

  return (
    <Stack.Navigator
      initialRouteName={Screens.TAB_SCREENS}
      screenOptions={screenOptions}>
      <Stack.Screen name={Screens.TAB_SCREENS} component={TabScreens} />
      <Stack.Screen name={Screens.FRIENDS} component={FriendsScreen} />
      <Stack.Screen name={Screens.COMMENT} component={CommentScreen} />
      <Stack.Screen name={Screens.SETTINGS} component={SettingsScreen} />
      <Stack.Screen name={Screens.CHAT} component={ChatScreen} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screens.SIGN_IN}
      screenOptions={screenOptions}>
      <Stack.Screen name={Screens.SIGN_IN} component={SignInScreen} />
      <Stack.Screen name={Screens.SIGN_UP} component={SignUpScreen} />
    </Stack.Navigator>
  );
};

const AppNavigation = () => {
  const [currentToken, setCurrentToken] = useState<Token | null | undefined>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const token = useSelector((state: RootState) => state.session);

  useEffect(() => {
    setCurrentToken(token);
  }, [token]);

  return (
    <NavigationContainer>
      {isLoading ? (
        <SplashScreen setLoading={setIsLoading} />
      ) : currentToken ? (
        <AppStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppNavigation;
