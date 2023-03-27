import {ActionTypes} from '../../util/enums';
import {State} from '../../util/interface';
import {Dispatch} from 'redux';

interface DispatchType {
  type: ActionTypes;
  payload: State;
}

export const signIn = (user: State) => {
  return (dispatch: Dispatch<DispatchType>) => {
    dispatch({
      type: ActionTypes.SET_USER,
      payload: user,
    });
  };
};

export const signOut = () => {
  return (dispatch: Dispatch<DispatchType>) => {
    dispatch({
      type: ActionTypes.REMOVE_USER,
      payload: null,
    });
  };
};
