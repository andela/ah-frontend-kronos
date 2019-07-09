import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
import { Welcome } from './components/Welcome';
import SignUpForm from './components/auth/registration/SignUpForm'; // eslint-disable-line import/no-named-as-default
import AuthNavigation from './components/common/navigation/AuthNavigation';
import history from './utils/history';


function Routes() {
  return (
    <Router history={history}>
      <AuthNavigation />
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/signup" component={SignUpForm} />
      </Switch>
    </Router>
  );
}

export default Routes;
