import {ActionTypes, TokenActionTypes} from './enums';

export interface User {
  id: number;
  username: string;
  pictureUrl: string;
}

export interface Post {
  id: number;
  createdBy: number;
  createdByUsername: string;
  caption: string;
  pictureUrl: string;
  profilePictureUrl: string;
  createdAt: string;
  likes: Like[];
}

interface Like {
  id: number;
  postId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthType {
  user?: User | null;
}

export interface ActionsType {
  type: ActionTypes;
  payload?: User | null;
}

export interface TokenActionsType {
  type: TokenActionTypes;
  payload?: Token | null;
}

export interface Token {
  expires_at: string;
  token: string;
  type: string;
}

export interface Message {
  id: number;
  author: User;
  content: string;
  createdAt: string;
}
export interface Chat {
  id: number;
  lastRead: string | null;
  createdAt: string;
  updatedAt: string;
  user_1: User;
  user_2: User;
  lastMessage?: Message;
}

export type AuthToken = Token | undefined | null;

export type State = User | undefined | null;
