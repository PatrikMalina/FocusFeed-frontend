import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import userReducer from './reducers/userReducer';
import sessionReducer from './reducers/sessionReducer';
import messageReducer from './reducers/messageReducer';
import chatReducer from './reducers/chatReducer';

const rootReducer = combineReducers({
  user: userReducer,
  session: sessionReducer,
  messages: messageReducer,
  chats: chatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
