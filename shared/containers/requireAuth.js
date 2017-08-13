import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function (ComposedComponent, userRole) {
  class Authentication extends Component {
    static propTypes = {
      authenticated: PropTypes.bool,
      roles: PropTypes.array,
    };

    static contextTypes = {
      router: PropTypes.object,
    };

    componentWillMount() {
      const { authenticated, roles } = this.props;

      // If not authenticated push to signin route
      if (authenticated === false) {
        this.context.router.history.push('/signin');
      } else if (
        authenticated === true &&
        userRole === 'admin' &&
        roles &&
        roles.includes('admin')
      ) {
        // If authenticated and user is admin
        this.context.router.history.push(
          this.context.router.route.location.pathname,
        );
      }
    }

    componentWillUpdate(nextProps) {
      const { authenticated, roles } = nextProps;

      // If not authenticated push to signin route
      if (authenticated === false) {
        this.context.router.history.push('/signin');
      } else if (
        authenticated === true &&
        userRole === 'admin' &&
        roles &&
        roles.includes('admin')
      ) {
        // If authenticated and user is admin
        this.context.router.history.push(
          this.context.router.route.location.pathname,
        );
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    const newStateToProps = {
      authenticated: state.auth.authenticated,
    };

    if (state.auth.user && state.auth.user.roles) {
      newStateToProps.roles = state.auth.user.roles;
    }

    return newStateToProps;
  }

  return connect(mapStateToProps)(Authentication);
}
