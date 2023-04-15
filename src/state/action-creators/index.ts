import {ActionTypes, TokenActionTypes} from '../../util/enums';
import {AuthToken, State} from '../../util/interface';
import {Dispatch} from 'redux';

interface UserDispatchType {
  type: ActionTypes;
  payload: State;
}

interface TokenDispatchType {
  type: TokenActionTypes;
  payload: AuthToken;
}

export const setUser = (user: State) => {
  return (dispatch: Dispatch<UserDispatchType>) => {
    dispatch({
      type: ActionTypes.SET_USER,
      payload: user,
    });
  };
};

export const removeUser = () => {
  return (dispatch: Dispatch<UserDispatchType>) => {
    dispatch({
      type: ActionTypes.REMOVE_USER,
      payload: null,
    });
  };
};

export const setToken = (token: AuthToken) => {
  return (dispatch: Dispatch<TokenDispatchType>) => {
    dispatch({
      type: TokenActionTypes.SET_TOKEN,
      payload: token,
    });
  };
};

export const removeToken = () => {
  return (dispatch: Dispatch<TokenDispatchType>) => {
    dispatch({
      type: TokenActionTypes.REMOVE_TOKEN,
      payload: null,
    });
  };
};
