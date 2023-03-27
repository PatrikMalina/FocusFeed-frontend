import {ActionTypes} from '../../util/enums';
import {ActionsType, State} from '../../util/interface';

const reducer = (state: State = null, action: ActionsType) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return (state = action.payload);
    case ActionTypes.REMOVE_USER:
      return (state = null);

    default:
      return state;
  }
};

export default reducer;
