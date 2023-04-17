import {ActionTypes, TokenActionTypes} from './enums';

export interface User {
  id: number;
  username: string;
  picture_url: string;
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

export type AuthToken = Token | undefined | null;

export type State = User | undefined | null;
