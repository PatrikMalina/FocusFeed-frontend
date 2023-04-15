import {TokenActionTypes} from '../../util/enums';
import {TokenActionsType, AuthToken} from '../../util/interface';

const tokenReducer = (state: AuthToken = null, action: TokenActionsType) => {
  switch (action.type) {
    case TokenActionTypes.SET_TOKEN:
      return (state = action.payload);
    case TokenActionTypes.REMOVE_TOKEN:
      return (state = null);

    default:
      return state;
  }
};

export default tokenReducer;
