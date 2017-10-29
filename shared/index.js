import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppLayout, { Content } from 'components/app-layout';
import config from './utils/config';

// Components
import Header from './components/header';
import Menu from './components/common/menu';
import ScrollToTop from './components/common/scrollToTop';

// Container Components
import PrivateRoute from './containers/privateRoute';

// Routes
import Dashboard from './routes/dashboard';
import About from './routes/about';
import Signout from './routes/signout';
import ResetPassword from './routes/resetPassword';
import NotFound from './routes/not-found';
import Profile from './routes/profile';
import Users from './routes/users';
import Logger from './routes/logger';
import Signin from './routes/signin';

class App extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    menuOpen: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidUpdate() {
    const { location, authenticated, history } = this.props;
    if (location.pathname === '/signin' && authenticated) {
      history.push('/');
    }
  }

  render() {
    const { isAdmin, menuOpen, authenticated } = this.props;

    return (
      <AppLayout>
        <Helmet {...config('helmet')} />
        <Header />
        <main style={{ display: 'flex' }}>
          {authenticated ? <Menu open={menuOpen} /> : null}
          <ScrollToTop>
            <Content>
              <Switch>
                <Route path="/reset/:token" component={ResetPassword} />
                <PrivateRoute
                  exact
                  path="/"
                  component={Dashboard}
                  authenticated={isAdmin}
                />
                <PrivateRoute
                  path="/about"
                  component={About}
                  authenticated={isAdmin}
                />
                <Route path="/signout" component={Signout} />
                <PrivateRoute
                  path="/profile"
                  component={Profile}
                  authenticated={isAdmin}
                />
                <PrivateRoute
                  path="/users"
                  component={Users}
                  authenticated={isAdmin}
                />
                <PrivateRoute
                  path="/logs"
                  component={Logger}
                  authenticated={isAdmin}
                />
                <Route path="/signin" component={Signin} />
                <Route component={NotFound} />
              </Switch>
            </Content>
          </ScrollToTop>
        </main>
      </AppLayout>
    );
  }
}

/**
 * Maps state to props
 * @param {Object} state - Application state
 * @returns {Object}
 */
function mapStateToProps(state) {
  const { authenticated, user } = state.auth;
  const { menuOpen } = state.common;

  // Check if user is admin user
  const isAdmin = !!(
    user &&
    user.roles &&
    user.roles.length > 0 &&
    user.roles.includes('admin')
  );
  return { authenticated, isAdmin, menuOpen };
}

App.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default withRouter(
  connect(mapStateToProps, null, null, { pure: false })(App)
);
