import {Friend} from '../../components/CustomFriends/CustomFriends';
import {FriendActionTypes} from '../../util/enums';
import {FriendActionsType} from '../../util/interface';

const friendReducer = (state: Friend[] = [], action: FriendActionsType) => {
  switch (action.type) {
    case FriendActionTypes.SET_FRIENDS:
      if (action.payload) {
        state = action.payload;
      }

      return state;
    case FriendActionTypes.ADD_FRIENDS:
      if (action.payload === undefined) return state;
      return [...state, ...action.payload];

    default:
      return state;
  }
};

export default friendReducer;
