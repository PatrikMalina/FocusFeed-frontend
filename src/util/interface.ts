import {Friend} from '../components/CustomFriends/CustomFriends';
import {
  UserActionTypes,
  ChatActionTypes,
  MessageActionTypes,
  TokenActionTypes,
  FriendActionTypes,
  OnlineActionTypes,
} from './enums';

export interface User {
  id: number;
  username: string;
  pictureUrl: string;
  email?: string;
}

export interface Post {
  id: number;
  createdBy: number;
  caption: string;
  pictureUrl: string;
  createdAt: string;
  likes: Like[];
  comments: Comment[];
  createdByUsername: string;
  profilePictureUrl: string;
  location: {
    x: number;
    y: number;
  } | null;
}

export interface Like {
  id: number;
  postId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  postId: number;
  userId: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  commentByUsername: string;
  commentProfilePictureUrl: string;
}

export interface AuthType {
  user?: User | null;
}

export interface UserActionsType {
  type: UserActionTypes;
  payload?: User | null;
}

export interface TokenActionsType {
  type: TokenActionTypes;
  payload?: Token | null;
}

export interface MessageActionsType {
  type: MessageActionTypes;
  payload?: Message[];
  chatId?: number;
}

export interface ChatActionsType {
  type: ChatActionTypes;
  payload?: Chat[];
}

export interface FriendActionsType {
  type: FriendActionTypes;
  payload?: Friend[];
}

export interface OnlineActionsType {
  type: OnlineActionTypes;
  payload?: number[];
}

export interface Token {
  expires_at: string;
  token: string;
  type: string;
}

export interface Message {
  id: number;
  createdBy: number;
  content: string;
  createdAt: string;
  offline?: boolean;
}
export interface Chat {
  id: number;
  lastRead: string | null;
  createdAt: string;
  updatedAt: string;
  user_1: User;
  user_2: User;
}

export type AuthToken = Token | undefined | null;

export type State = User | undefined | null;
