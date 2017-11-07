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
    menuOpen: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.checkRoute();
  }

  /**
   * Checks if user is authenticated and if route is signin
   * then he routes to home page
   */
  checkRoute() {
    const { location, authenticated, history } = this.props;

    if (location.pathname === '/signin' && authenticated) {
      history.push('/');
    } else if (authenticated) {
      history.push(location.pathname);
    }
  }

  render() {
    const { menuOpen, authenticated } = this.props;

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
                <PrivateRoute exact path="/" component={Dashboard} authenticated={authenticated} />
                <PrivateRoute path="/about" component={About} authenticated={authenticated} />
                <Route path="/signout" component={Signout} />
                <PrivateRoute path="/profile" component={Profile} authenticated={authenticated} />
                <PrivateRoute path="/users" component={Users} authenticated={authenticated} />
                <PrivateRoute path="/logs" component={Logger} authenticated />
                <Route path="/signin" component={Signin} />
                <PrivateRoute component={NotFound} authenticated={authenticated} />
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
  const { authenticated } = state.auth;
  const { menuOpen } = state.common;
  return { authenticated, menuOpen };
}

export default withRouter(connect(mapStateToProps, null, null, { pure: false })(App));
