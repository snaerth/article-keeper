import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Routes
import Home from './home';
import About from './about';
import Signout from './signout';
import NotFound from './not-found';
import Profile from './profile';
import Admin from './admin';
import Logger from './logger';

// Components
import ResetPassword from '../components/auth/resetPassword';

// Container Components
import PrivateRoute from '../containers/privateRoute';

export default function Routes(authenticated) {
  return (
    <Switch>
      <Route exact path="/" name="My application name" component={Home} />
      <Route exact path="/about" component={About} />
      <Route path="/signout" name="Sign out" component={Signout} />
      <Route
        path="/reset/:token"
        name="Reset password"
        component={ResetPassword}
      />
      <Route
        path="/profile"
        name="Profile"
        component={Profile}
        state={{ name: 'Test' }}
      />
      <Route path="/logs" name="Logs" component={Logger} />
      {/* <Route path="/admin" name="Admin" component={requireAuth(Admin, 'admin')} /> */}
      <PrivateRoute
        exact
        path="/admin"
        component={Admin}
        authenticated={authenticated}
      />
      <Route name="404 Page not found" component={NotFound} />
    </Switch>
  );
}
