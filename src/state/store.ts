import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import userReducer from './reducers/userReducer';
import sessionReducer from './reducers/sessionReducer';

const rootReducer = combineReducers({
  user: userReducer,
  session: sessionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
