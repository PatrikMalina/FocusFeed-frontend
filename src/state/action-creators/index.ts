import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  UserActionTypes,
  TokenActionTypes,
  ChatActionTypes,
  MessageActionTypes,
  FriendActionTypes,
} from '../../util/enums';
import {AuthToken, Chat, Message, State} from '../../util/interface';
import {Dispatch} from 'redux';
import store from '../store';
import {Friend} from '../../components/CustomFriends/CustomFriends';

interface UserDispatchType {
  type: UserActionTypes;
  payload: State;
}

interface TokenDispatchType {
  type: TokenActionTypes;
  payload: AuthToken;
}

interface ChatDispatchType {
  type: ChatActionTypes;
  payload: Chat[];
}

interface FriendDispatchType {
  type: FriendActionTypes;
  payload: Friend[];
}

interface MessageDispatchType {
  type: MessageActionTypes;
  payload: Message[];
  chatId?: number;
}

export const setUser = (user: State) => {
  return (dispatch: Dispatch<UserDispatchType>) => {
    dispatch({
      type: UserActionTypes.SET_USER,
      payload: user,
    });
  };
};

export const removeUser = () => {
  return (dispatch: Dispatch<UserDispatchType>) => {
    dispatch({
      type: UserActionTypes.REMOVE_USER,
      payload: null,
    });
  };
};

export const setToken = (token: AuthToken, saveToStorage: boolean = true) => {
  if (saveToStorage) {
    try {
      const jsonValue = JSON.stringify(token);
      AsyncStorage.setItem('@token', jsonValue);
    } catch (e) {
      console.warn(e);
    }
  }

  return (dispatch: Dispatch<TokenDispatchType>) => {
    dispatch({
      type: TokenActionTypes.SET_TOKEN,
      payload: token,
    });
  };
};

export const unauthorized = () => {
  try {
    AsyncStorage.removeItem('@token');
  } catch (e) {
    console.warn(e);
  }

  store.dispatch({
    type: TokenActionTypes.REMOVE_TOKEN,
    payload: null,
  });
};

export const removeToken = () => {
  try {
    AsyncStorage.removeItem('@token');
  } catch (e) {
    console.warn(e);
  }

  return (dispatch: Dispatch<TokenDispatchType>) => {
    dispatch({
      type: TokenActionTypes.REMOVE_TOKEN,
      payload: null,
    });
  };
};

export const setChats = (chats: Chat[]) => {
  return (dispatch: Dispatch<ChatDispatchType>) => {
    dispatch({
      type: ChatActionTypes.SET_CHATS,
      payload: chats,
    });
  };
};

export const setFriends = (friends: Friend[]) => {
  return (dispatch: Dispatch<FriendDispatchType>) => {
    dispatch({
      type: FriendActionTypes.SET_FRIENDS,
      payload: friends,
    });
  };
};

export const setMessages = (messages: Message[], chatId: number) => {
  return (dispatch: Dispatch<MessageDispatchType>) => {
    dispatch({
      type: MessageActionTypes.SET_MESSAGES,
      payload: messages,
      chatId: chatId,
    });
  };
};

export const addMessages = (messages: Message, chatId: number) => {
  return (dispatch: Dispatch<MessageDispatchType>) => {
    dispatch({
      type: MessageActionTypes.ADD_MESSAGE,
      payload: [messages],
      chatId: chatId,
    });
  };
};

export const loadMessages = (messages: Message[], chatId: number) => {
  return (dispatch: Dispatch<MessageDispatchType>) => {
    dispatch({
      type: MessageActionTypes.LOAD_MESSAGES,
      payload: messages,
      chatId: chatId,
    });
  };
};
