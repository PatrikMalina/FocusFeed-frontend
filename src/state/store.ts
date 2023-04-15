import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import userReducer from './reducers/userReducer';
import tokenReducer from './reducers/tokenReducer';

const rootReducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
