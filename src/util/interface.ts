import {ActionTypes, TokenActionTypes} from './enums';

export interface User {
  id: number;
  username: string;
  picture_url: string;
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
