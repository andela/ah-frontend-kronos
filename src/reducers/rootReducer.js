import { combineReducers } from 'redux';
import userReducer from './auth/registrationReducer';
import socialLoginReducer from './auth/socialLoginReducer';

export default combineReducers({
  user: userReducer,
  socialLoginReducer,
});
