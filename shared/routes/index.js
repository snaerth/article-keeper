import React from 'react';
import { Route, Switch } from 'react-router-dom';
import requireAuth from './../containers/requireAuth';
import pageWrapper from './../containers/pageWrapper';
import asyncRoute from '../containers/asyncRoute';

const Home = asyncRoute(() => System.import('./home'));
const Signin = asyncRoute(() => System.import('./../components/auth/signin'));
const Signup = asyncRoute(() => System.import('./../components/auth/signup'));
const Signout = asyncRoute(() => System.import('./signout'));
const ForgotPassword = asyncRoute(() =>
  System.import('./../components/auth/forgotPassword'),
);
const ResetPassword = asyncRoute(() =>
  System.import('./../components/auth/resetPassword'),
);
const Profile = asyncRoute(() => System.import('./profile'));
const Admin = asyncRoute(() => System.import('./admin'));
const NotFound = asyncRoute(() => System.import('./notfound'));

export { NotFound };

export default (
  <Switch>
    <Route exact path="/" name="My application name" component={Home} />
    <Route path="/signin" name="Sign in" component={pageWrapper(Signin)} />
    <Route path="/signup" name="Sign up" component={pageWrapper(Signup)} />
    <Route path="/signout" name="Sign out" component={pageWrapper(Signout)} />
    <Route
      path="/forgotpassword"
      name="Forgot password"
      component={pageWrapper(ForgotPassword)}
    />
    <Route
      path="/reset/:token"
      name="Reset password"
      component={pageWrapper(ResetPassword)}
    />
    <Route path="/profile" name="Profile" component={pageWrapper(Profile)} />
    <Route
      path="/admin"
      name="Admin"
      component={requireAuth(pageWrapper(Admin), 'admin')}
    />
    <Route name="404 Page not found" component={pageWrapper(NotFound)} />
  </Switch>
);
