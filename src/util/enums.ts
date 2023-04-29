export enum CustomTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

export enum UserActionTypes {
  SET_USER = 'setUser',
  REMOVE_USER = 'removeUser',
}

export enum TokenActionTypes {
  SET_TOKEN = 'setToken',
  REMOVE_TOKEN = 'removeToken',
}

export enum MessageActionTypes {
  SET_MESSAGES = 'setMessages',
  ADD_MESSAGE = 'addMessage',
  LOAD_MESSAGES = 'loadMessages',
}

export enum ChatActionTypes {
  SET_CHATS = 'setChats',
  ADD_CHAT = 'addChat',
}

export enum FriendActionTypes {
  SET_FRIENDS = 'setFriends',
  ADD_FRIENDS = 'addFriends',
}

export enum Screens {
  HOME = 'Home',
  COMMENT = 'Comment',
  SIGN_IN = 'SignIn',
  SIGN_UP = 'SignUp',
  CONTACTS = 'Contacts',
  FRIENDS = 'Friends',
  TAB_SCREENS = 'Tab screens',
  NEW_POST = 'NewPost',
  PROFILE = 'Profile',
  SETTINGS = 'Settings',
  CHAT = 'Chat',
}

export enum FriendshipStatus {
  ACCEPTED = 1,
  PENDING = 0,
  DECLINED = -1,
}
