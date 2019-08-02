import { combineReducers } from 'redux';
import userReducer from './auth/register/registrationReducer';
import loginReducer from './auth/login/loginReducer';
import socialLoginReducer from './auth/socialLoginReducer';
import articleReducer from './articles/articleReducer';
import articlesReducer from './articles/articlesReducers';
import singleArticleReducer from './articles/singleArticleReducer';
import profileReducer from './profile/profileReducer';
import articlesLikeReducer from './articles/articleLikeDislikeReducer';
import reportReducer from './articles/reportReducer';
import followReducer from './profile/followReducer';

export default combineReducers({
  user: userReducer,
  socialLoginReducer,
  article: articleReducer,
  articlesReducer,
  singleArticleReducer,
  loginReducer,
  profile: profileReducer,
  articlesLikeReducer,
  reportReducer,
  followReducer,
});
