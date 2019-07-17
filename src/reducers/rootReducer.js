import { combineReducers } from 'redux';
import userReducer from './auth/registrationReducer';
import socialLoginReducer from './auth/socialLoginReducer';
import resetPasswordReducer from './auth/resetPasswordReducer';

export default combineReducers({
  user: userReducer,
  socialLoginReducer,
  resetPasswordReducer,
});
