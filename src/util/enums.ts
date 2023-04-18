export enum CustomTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

export enum ActionTypes {
  SET_USER = 'setUser',
  REMOVE_USER = 'removeUser',
}

export enum TokenActionTypes {
  SET_TOKEN = 'setToken',
  REMOVE_TOKEN = 'removeToken',
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
  SETTINGS = 'Settings'
}

export enum FriendshipStatus {
  ACCEPTED = 1,
  PENDING = 0,
  DECLINED = -1,
}
