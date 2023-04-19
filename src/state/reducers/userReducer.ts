import {UserActionTypes} from '../../util/enums';
import {UserActionsType, State} from '../../util/interface';

const reducer = (state: State = null, action: UserActionsType) => {
  switch (action.type) {
    case UserActionTypes.SET_USER:
      return (state = action.payload);
    case UserActionTypes.REMOVE_USER:
      return (state = null);

    default:
      return state;
  }
};

export default reducer;
