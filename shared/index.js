import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppLayout, { Content } from 'components/app-layout';
import Analytics from 'components/analytics';
import config from './utils/config';

// Components
import Header from './components/header';

// Routes
import Home from './routes/home';
import About from './routes/about';
import Signout from './routes/signout';
import NotFound from './routes/not-found';
import Profile from './routes/profile';
import Admin from './routes/admin';
import Signin from './routes/signin';
import Logger from './routes/logger';

// Components
import Signup from './components/auth/signup';
import ForgotPassword from './components/auth/forgotPassword';
import ResetPassword from './components/auth/resetPassword';

// Container Components
import PrivateRoute from './containers/privateRoute';

// Container Components
// import RoutesContainer from './containers/routesContainer';

const App = ({ authenticated }) => (
  <AppLayout>
    <Helmet {...config('helmet')} />
    <Header />
    <Content>
      <Route component={Analytics} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/signout" component={Signout} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route path="/reset/:token" component={ResetPassword} />
        <Route path="/profile" component={Profile} />
        <Route path="/logs" component={Logger} />
        <PrivateRoute
          path="/admin"
          component={Admin}
          authenticated={authenticated}
        />
        <Route component={NotFound} />
      </Switch>
    </Content>
  </AppLayout>
);

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default withRouter(connect(mapStateToProps, null)(App));
