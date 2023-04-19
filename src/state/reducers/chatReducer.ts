import {ChatActionTypes} from '../../util/enums';
import {Chat, ChatActionsType} from '../../util/interface';

const chatReducer = (state: Chat[] = [], action: ChatActionsType) => {
  switch (action.type) {
    case ChatActionTypes.SET_CHATS:
      if (action.payload) {
        state = action.payload;
      }

      return state;
    case ChatActionTypes.ADD_CHAT:
      return [...state, action.payload];

    default:
      return state;
  }
};

export default chatReducer;
