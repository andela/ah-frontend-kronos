/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
import { Welcome } from './components/Welcome'; // eslint-disable-line import/no-named-as-default
import SignUpForm from './components/auth/registration/SignUpForm';
import AuthNavigation from './components/common/navigation/AuthNavigation';
import history from './utils/history';
import CreateArticle from './components/articles/CreateArticle';
import EditArticle from './components/articles/EditArticle';
import Login from './components/Login';
import SocialLoginSuccess from './components/social/SuccessPage';
import DeleteArticle from './components/articles/DeleteArticle';


function Routes() {
  return (
    <Router history={history}>
      <AuthNavigation />
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/login" component={Login} />
        <Route path="/successpage" component={SocialLoginSuccess} />
        <Route path="/update-article" component={EditArticle} />
        <Route path="/create-article" component={CreateArticle} />
        <Route path="/delete-article" component={DeleteArticle} />
      </Switch>
    </Router>
  );
}

export default Routes;
