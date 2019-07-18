import { combineReducers } from 'redux';
import userReducer from './auth/registrationReducer';
import socialLoginReducer from './auth/socialLoginReducer';
import articleReducer from './articles/articleReducer';

export default combineReducers({
  user: userReducer,
  socialLoginReducer,
  article: articleReducer,
});
