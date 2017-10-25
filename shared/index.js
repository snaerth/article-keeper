import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppLayout, { Content } from 'components/app-layout';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import config from './utils/config';
// Components
import Header from './components/header';
import Menu from './components/common/menu';
import * as actionCreators from './components/auth/actions';
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

class App extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    menuOpen: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.onRouteChanged(this.props.location.pathname);
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location !== prevProps.location) {
      this.onRouteChanged(location.pathname);
    }
  }

  /**
   * When route changes in router and pathname includes signin or signup,
   * then redirect to home and open signin modal
   *
   * @param {String} pathname
   * @returns {undefined}
   */
  onRouteChanged(pathname) {
    const { history } = this.props;
    if (pathname.includes('/signin') || pathname.includes('/signup')) {
      history.push('/');
      this.props.actions.openModal();
    }
  }

  render() {
    const { isAdmin, menuOpen } = this.props;

    return (
      <AppLayout>
        <Helmet {...config('helmet')} />
        <Header />
        <main style={{ display: 'flex' }}>
          <Menu open={menuOpen} />
          <Content>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/about" component={About} />
              <Route path="/signout" component={Signout} />
              <Route path="/reset/:token" component={ResetPassword} />
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
              <Route component={NotFound} />
            </Switch>
          </Content>
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

/**
 * Maps dispatch to components props
 * @param {Object} dispatch - Redux dispatch medhod
 * @returns {Object}
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
}

App.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
