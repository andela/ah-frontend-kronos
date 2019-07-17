import { combineReducers } from 'redux';
import userReducer from './auth/registrationReducer';
import socialLoginReducer from './auth/socialLoginReducer';
import articleReducer from './articles/articleReducer';
import articlesReducer from './articleReducers/articlesReducers';
import singleArticleReducer from './articleReducers/singleArticleReducer';

export default combineReducers({
  user: userReducer,
  socialLoginReducer,
  article: articleReducer,
  articlesReducer,
  singleArticleReducer,
});
