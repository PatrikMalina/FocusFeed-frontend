import {ActionTypes} from './enums';

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

export type State = User | undefined | null;
