import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
import SignUpForm from './components/auth/registration/SignUpForm';
import AuthNavigation from './components/common/navigation/AuthNavigation';
import UpdateProfileForm from './components/profile/UpdateProfileForm';
import ViewProfileForm from './components/profile/ViewProfileForm';
import history from './utils/history';
import CreateArticle from './components/articles/CreateArticle';
import EditArticle from './components/articles/EditArticle';
import LoginContainer from './components/auth/login/loginContainer';
import Articles from './components/articles/articlesComponent';
import Article from './components/articles/articleComponent';
import Footer from './components/common/Footer/Footer';
import PrivateRoute from './utils/privateRoute';
import AuthorProfile from './components/profile/authorProfile';

function Routes() {
  return (
    <Router history={history}>
      <AuthNavigation />
      <Switch>
        <Route exact path="/" component={Articles} />
        <Route path="/signup" component={SignUpForm} />
        <PrivateRoute
          exact
          path="/editProfile"
          component={UpdateProfileForm}
          isAuthenticated={sessionStorage.getItem('isLoggedIn')}
        />
        <PrivateRoute
          exact
          path="/viewProfile"
          component={ViewProfileForm}
          isAuthenticated={sessionStorage.getItem('isLoggedIn')}
        />
        <Route path="/login" component={LoginContainer} />
        <PrivateRoute
          path="/update-article"
          component={EditArticle}
          isAuthenticated={sessionStorage.getItem('isLoggedIn')}
        />
        <PrivateRoute
          path="/create-article"
          component={CreateArticle}
          isAuthenticated={sessionStorage.getItem('isLoggedIn')}
        />
        <PrivateRoute
          path="/articles"
          component={Articles}
          isAuthenticated={sessionStorage.getItem('isLoggedIn')}
        />
        <PrivateRoute
          exact
          path="/profile/:username"
          component={AuthorProfile}
          isAuthenticated={sessionStorage.getItem('isLoggedIn')}
        />
        <Route path="/:slug" component={Article} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default Routes;
