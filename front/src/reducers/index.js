import { combineReducers } from 'redux';

import movieReducer from './movieReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';

export default combineReducers({
  movieReducer: movieReducer,
  authReducer: authReducer,
  userReducer: userReducer,
});