import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Routes
import Home from './home';
import About from './about';
import Signout from './signout';
import NotFound from './not-found';
import Profile from './profile';
import Admin from './admin';
import Signin from './signin';

// Components
import Signup from '../components/auth/signup';
import ForgotPassword from '../components/auth/forgotPassword';
import ResetPassword from '../components/auth/resetPassword';

// Container Components
import requireAuth from '../containers/requireAuth';

export default (
  <Switch>
    <Route exact path="/" name="My application name" component={Home} />
    <Route exact path="/about" component={About} />
    <Route path="/signin" name="Sign in" component={Signin} />
    <Route path="/signup" name="Sign up" component={Signup} />
    <Route path="/signout" name="Sign out" component={Signout} />
    <Route
      path="/forgotpassword"
      name="Forgot password"
      component={ForgotPassword}
    />
    <Route
      path="/reset/:token"
      name="Reset password"
      component={ResetPassword}
    />
    <Route path="/profile" name="Profile" component={Profile} />
    <Route path="/admin" name="Admin" component={requireAuth(Admin, 'admin')} />
    <Route name="404 Page not found" component={NotFound} />
  </Switch>
);
