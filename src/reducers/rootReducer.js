import { combineReducers } from 'redux';
import userReducer from './auth/registrationReducer';

export default combineReducers({
  user: userReducer,
});
