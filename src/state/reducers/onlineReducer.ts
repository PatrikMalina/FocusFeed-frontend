import {OnlineActionTypes} from '../../util/enums';
import {OnlineActionsType} from '../../util/interface';

const onlineReducer = (state: number[] = [], action: OnlineActionsType) => {
  switch (action.type) {
    case OnlineActionTypes.SET_LIST:
      if (action.payload) {
        state = action.payload;
      }

      return state;
    case OnlineActionTypes.ONLINE:
      if (action.payload === undefined) return state;
      return [...state, ...action.payload];

    case OnlineActionTypes.OFFLINE:
      if (action.payload === undefined) return state;

      const list = [...state];
      const index = list.indexOf(action.payload[0], 0);

      if (index > -1) {
        list.splice(index, 1);
      }
      return [...list];

    default:
      return state;
  }
};

export default onlineReducer;
