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
      if (!this.props.authenticated) {
        this.context.router.push('/signin');
      } else if (
        userRole === 'admin' &&
        this.props.roles &&
        this.props.roles.indexOf('admin') > -1
      ) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/signin');
      } else if (
        userRole === 'admin' &&
        nextProps.roles &&
        nextProps.roles.indexOf('admin') > -1
      ) {
        this.context.router.push('/');
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
