import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  UserActionTypes,
  TokenActionTypes,
  ChatActionTypes,
  MessageActionTypes,
} from '../../util/enums';
import {AuthToken, Chat, Message, State} from '../../util/interface';
import {Dispatch} from 'redux';

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
