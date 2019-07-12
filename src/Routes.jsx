/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
import SignUpForm from './components/auth/registration/SignUpForm';
import AuthNavigation from './components/common/navigation/AuthNavigation';
import history from './utils/history';
import CreateArticle from './components/articles/CreateArticle';
import EditArticle from './components/articles/EditArticle';
import LoginContainer from './components/auth/login/loginContainer';
import Articles from './components/articles/articlesComponent';
import Article from './components/articles/articleComponent';

function Routes() {
  return (
    <Router history={history}>
      <AuthNavigation />
      <Switch>
        <Route exact path="/" component={Articles} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/update-article" component={EditArticle} />
        <Route path="/create-article" component={CreateArticle} />
        <Route path="/articles" component={Articles} />
        <Route path="/:slug" component={Article} />
      </Switch>
    </Router>
  );
}

export default Routes;
