import React from 'react';
import Helmet from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import config from 'utils/config';

// Layout
import AppLayout, { Content } from 'components/app-layout';
import Analytics from 'components/analytics';

// Routes
import Home from './routes/home';
import About from './routes/about';
import Signout from './routes/signout';
import NotFound from './routes/not-found';
import Profile from './routes/profile';
import Admin from './routes/admin';

// Components
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import ForgotPassword from './components/auth/forgotPassword';
import ResetPassword from './components/auth/resetPassword';

// Container Components
import requireAuth from './containers/requireAuth';

export default function App() {
  return (
    <AppLayout>
      <Helmet {...config('helmet')} />
      Header should be here
      <Content>
        <Route component={Analytics} />
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
          <Route
            path="/admin"
            name="Admin"
            component={requireAuth(Admin, 'admin')}
          />
          <Route name="404 Page not found" component={NotFound} />
        </Switch>
      </Content>
    </AppLayout>
  );
}
