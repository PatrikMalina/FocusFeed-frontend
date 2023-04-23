import {MessageActionTypes} from '../../util/enums';
import {Message, MessageActionsType} from '../../util/interface';

export interface MessageStore {
  [chatId: string]: Message[];
}

const messageReducer = (
  state: MessageStore = {},
  action: MessageActionsType,
) => {
  switch (action.type) {
    case MessageActionTypes.SET_MESSAGES:
      if (action.chatId && action.payload) {
        const messageObj: MessageStore = {};
        messageObj[action.chatId] = action.payload;

        return {...state, ...messageObj};
      }

    case MessageActionTypes.ADD_MESSAGE:
      if (action.payload && action.chatId) {
        const messages: Message[] = state[action.chatId];

        const messageObj: MessageStore = {};
        messageObj[action.chatId] = action.payload.concat(messages);
        return {
          ...state,
          ...messageObj,
        };
      }

    case MessageActionTypes.LOAD_MESSAGES:
      if (action.payload && action.chatId) {
        const messages: Message[] = state[action.chatId];

        const messageObj: MessageStore = {};
        messageObj[action.chatId] = messages.concat(action.payload);
        return {
          ...state,
          ...messageObj,
        };
      }

    default:
      return state;
  }
};

export default messageReducer;
