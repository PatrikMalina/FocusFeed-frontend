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

    case FriendActionTypes.UPDATE_FRIENDS:
      if (action.payload === undefined) return state;

      const data = action.payload[0];
      const friends = [...state];

      const index = friends.findIndex(friend => friend.id === data.id);
      friends[index] = data;

      state = friends;

      return state;

    default:
      return state;
  }
};

export default friendReducer;
